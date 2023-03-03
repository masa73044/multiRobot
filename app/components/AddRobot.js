import React, { Component } from "react";
import { connect } from "react-redux";
import { intCreateRobot } from "../redux/robots";

export class AddRobot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fuelType: "electric",
      fuelLevel: 0,
      imageUrl:
        "https://i.ibb.co/X39mNct/Screenshot-2023-02-28-at-1-46-05-AM.png",
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
    const { name, fuelType, fuelLevel, imageUrl } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div id="container">
        <div id="navbar">Add Robot</div>
        <div className="selection">
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={name}
            />
          </label>
          <label>
            Fuel Type:
            <input
              type="text"
              name="fuelType"
              onChange={handleChange}
              value={fuelType}
            />
          </label>
          <label>
            Fuel Level:
            <input
              type="text"
              name="fuelLevel"
              onChange={handleChange}
              value={fuelLevel}
            />
          </label>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createRobot: (robot) => dispatch(intCreateRobot(robot, history)),
});

export default connect(null, mapDispatchToProps)(AddRobot);
