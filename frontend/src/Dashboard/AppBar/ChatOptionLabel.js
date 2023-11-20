import { Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
const ChosenOptionLabel = ({ name }) => {
  return (
    <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}>
      {`${name ? `Chosen Conversation ${name}` : "Hello"}`}
    </Typography>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    name: state.chat.chosenChatDetails?.name,
  };
};

export default connect(mapStoreStateToProps)(ChosenOptionLabel);
