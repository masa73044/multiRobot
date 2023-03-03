import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleRobot } from "../redux/singleRobot";
import UpdateRobot from "./UpdateRobot";
import { Link, Route } from "react-router-dom";
import { intRemoveProject } from "../redux/projects";

export class SingleRobot extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getRobot(this.props.match.params.robotId);
  }

  render() {
    const { singleRobot } = this.props;
    const { projects } = singleRobot;
    const robotId = this.props.match.params.robotId;

    return (
      <div className="singleRobot">
        <img
          src={singleRobot.imageUrl}
          alt={singleRobot.name}
          height="100"
          width="100"
        />
        <h3>Name: {singleRobot.name}</h3>

        <h3>Fuel Type: {singleRobot.fuelType}</h3>
        <h3>Fuel Level: {singleRobot.fuelLevel}</h3>
        <Link to={`/robots/${robotId}/update`}>
          <button type="submit">Update Robot</button>
        </Link>

        {projects ? (
          projects.map((project) => {
            return (
              <div key={project.id}>
                <Link to={`/projects/${project.id}`}>
                  <li>title: {project.title}</li>
                </Link>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => this.props.removeProject(project)}
                >
                  Delete
                </button>
                <ul>
                  <li>deadline: {project.deadline}</li>
                </ul>
              </div>
            );
          })
        ) : (
          <div> There are no projects registered in the database</div>
        )}
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
  removeProject: (project, robotId) =>
    dispatch(intRemoveProject(project, robotId)),
});

export default connect(mapState, mapDispatch)(SingleRobot);
