const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require('../middleware/auth');
const {controllers} = require("../controllers/friendInvitation/friendInvitationControllers");
const friendInvitation = require("../models/friendInvitation");


const postFriendInvitationSchema = Joi.object({
    targetEmailAddress: Joi.string().email().required(),
});

const inviteDecisionSchema = Joi.object({
    id:Joi.string().required,
});

router.post("/invite", auth, validator.body(postFriendInvitationSchema), controllers.postInvite);

router.post("/accept",auth, validator.body(inviteDecisionSchema), controllers.postAccept);

router.post("/reject",auth, validator.body(inviteDecisionSchema), controllers.postReject);


module.exports = router;