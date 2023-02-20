import React, { Component } from "react";
import { connect } from "react-redux";
import { intUpdateRobot } from "../redux/robots";

export class UpdateRobot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fuelLevel: 50,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateRobot({ ...this.props.robots, ...this.state });
  }

  render() {
    const { name, fuelLevel } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Update Robot</h2>
          <label htmlFor="name">Name:</label>
          <input name="name" onChange={handleChange} value={name} />

          <label htmlFor="fuelLevel">Fuel Level:</label>
          <input name="fuelLevel" onChange={handleChange} value={fuelLevel} />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  robots: state.robots.all,
});

const mapDispatch = (dispatch) => {
  return {
    updateRobot: (robot) => dispatch(intUpdateRobot(robot)),
  };
};

export default connect(mapState, mapDispatch)(UpdateRobot);
