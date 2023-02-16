import React, { Component } from "react";
import { connect } from "react-redux";
import { intCreateRobot } from "../redux/robots";

export class AddRobot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("hit");
    this.props.createRobot({ ...this.state });
  }

  handleChange(evt) {
    console.log("event.target -->", evt.target);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { name } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div id="container">
        <div id="navbar">Add Robot</div>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} value={name} />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createRobot: (robot) => dispatch(intCreateRobot(robot, history)),
});

export default connect(null, mapDispatchToProps)(AddRobot);
