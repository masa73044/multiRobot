import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleRobot } from "../redux/singleRobot";
import UpdateRobot from "./UpdateRobot";

export class SingleRobot extends Component {
  componentDidMount() {
    this.props.getRobot(this.props.match.params.robotId);
  }
  render() {
    const { singleRobot } = this.props;
    console.log(singleRobot, "SG");
    console.log(`Hit`, singleRobot.name);

    return (
      <div>
        <div>{singleRobot.name}</div>
        <img
          src={singleRobot.imageUrl}
          alt={singleRobot.name}
          height="100"
          width="100"
        />
        <div>{singleRobot.fuelType}</div>
        <div>{singleRobot.fuelLevel}</div>
        <UpdateRobot />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleRobot: state.robot.selectedRobot,
  };
};

const mapDispatch = (dispatch) => ({
  getRobot: (robotId) => dispatch(fetchSingleRobot(robotId)),
});

export default connect(mapState, mapDispatch)(SingleRobot);
