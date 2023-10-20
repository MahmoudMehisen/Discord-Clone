const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require('../middleware/auth');
const {controllers} = require("../controllers/friendInvitation/friendInvitationControllers");


const postFriendInvitationSchema = Joi.object({
    targetEmailAddress: Joi.string().email().required(),
});

router.post("/invite", auth, validator.body(postFriendInvitationSchema), controllers.postInvite);

module.exports = router;