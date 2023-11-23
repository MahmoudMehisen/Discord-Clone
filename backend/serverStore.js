const {uuid} = require("uuidv4");
const connectedUsers = new Map();
let io = null;
let activeRooms = [];
const setSocketServerInstance = (ioInstance) => {
    io = ioInstance;
}

const getSocketServerInstance = () => {
    return io;
}

const addNewConnectedUser = ({socketId, userId}) => {
    connectedUsers.set(socketId, {userId});
    console.log("new connect users");
}

const removeConnectedUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
        console.log("user disconnected");
    }
}

const getActiveConnections = (userId) => {
    const activeConnections = [];
    console.log(userId);
    connectedUsers.forEach(function (value, key) {
        if (value.userId === userId) {
            activeConnections.push(key);
        }
    })

    console.log(connectedUsers);

    return activeConnections;
}

const getOnlineUsers = () => {
    const onlineUsers = [];
    connectedUsers.forEach((value, key) => {
        onlineUsers.push({socketId: key, userId: value.userId});
    });
    return onlineUsers;
}

const addNewActiveRoom = (userId, socketId) => {
    const newActiveRoom = {
        roomCreator: {
            userId,
            socketId
        },
        participants: [
            {
                userId,
                socketId,
            }
        ],
        roomId: uuid()
    }

    activeRooms = ([...activeRooms, newActiveRoom]);

    return newActiveRoom;
}

const getActiveRooms = () => {
    return [...activeRooms];
}

const getActiveRoom = (roomId) => {
    const activeRoom = activeRooms.find(room => room.roomId === roomId);

    if (activeRoom) {
        return {
            ...activeRoom,
        };

    } else {
        return null;
    }
}


const joinActiveRoom = (roomId, newParticipant) => {
    const room = activeRooms.find(room => room.roomId === roomId);

    activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

    const updatedRoom = {
        ...room,
        participants: [...room.participants, newParticipant],
    };

    activeRooms.push(updatedRoom);
}

const leaveActiveRoom = (roomId, participantSocketId) => {
    const activeRoom = activeRooms.find((room) => room.roomId === roomId);

    if (activeRoom) {
        const copyOfActiveRoom = { ...activeRoom };

        copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
            (participant) => participant.socketId !== participantSocketId
        );

        activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

        if (copyOfActiveRoom.participants.length > 0) {
            activeRooms.push(copyOfActiveRoom);
        }
    }
}

module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getActiveConnections,
    getSocketServerInstance,
    setSocketServerInstance,
    getOnlineUsers,
    addNewActiveRoom,
    getActiveRooms,
    getActiveRoom,
    joinActiveRoom,
    leaveActiveRoom
}