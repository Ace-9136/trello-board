import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import "./App.css";
import TextareaAutosize from "react-textarea-autosize";
import { Card } from "antd";
import { Button } from "antd";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";

class ActionButton extends React.Component {
  state = {
    formOpen: false,
    text: "",
  };

  openForm = () => {
    this.setState({
      formOpen: true,
      text: "",
    });
  };

  closeForm = () => {
    this.setState({
      formOpen: false,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;
    if (text) {
      this.setState({
        text: "",
      });
      dispatch(addList(text));
    }
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;
    if (text) {
      this.setState({
        text: "",
      });
      dispatch(addCard(listID, text));
    }
  };

  renderForm = () => {
    const { list } = this.props;
    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
    const buttonTitle = list ? "Add List" : "Add card";

    return (
      <div>
        <Card
          className="formContainer"
          style={{
            border: "1px solid",
            boxShadow: "5px 10px 18px #888888",
          }}
        >
          <TextareaAutosize
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleInputChange}
            style={{
              resize: "none",
              width: "100%",
              overflow: "hidden",
              outline: "none",
              border: "none",
            }}
          />
        </Card>
        <div className="addButtonContainer">
          <Button
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            type="primary"
            className="addButton"
          >
            {buttonTitle}
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "red", marginLeft: "5px" }}
            shape="circle"
            size="small"
            icon={<CloseOutlined />}
          />
        </div>
      </div>
    );
  };

  renderAddButton = () => {
    const { list } = this.props;
    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "#B799FF" : "inherit";

    return (
      <div
        onClick={this.openForm}
        style={{
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground,
          display: "flex",
          alignItems: "center", // Align content vertically at the center
          justifyContent: "flex-start", // Align content horizontally to the left
          cursor: "pointer",
          height: "40px",
          width: "284px",
          borderRadius: "3px",
          paddingLeft: "10px",
        }}
      >
        <PlusOutlined style={{ marginRight: "5px" }} />
        <p style={{ margin: 0 }}>{buttonText}</p>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

export default connect()(ActionButton);
