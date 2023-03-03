import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProject } from "../redux/singleProject";
import UpdateProject from "./UpdateProject";
import { Link } from "react-router-dom";

export class SingleProject extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.projectId);
  }
  render() {
    const { singleProject } = this.props;

    let { robots, title, completed, priority, deadline, description } =
      singleProject;
    const projectId = this.props.match.params.projectId;

    return (
      <div>
        <div>Title: {title}</div>
        <div>Deadline: {deadline}</div>
        <div>Priority: {priority}</div>
        <div>Completion status: {completed ? "true" : "false"}</div>
        <div>Description: {description}</div>

        <Link to={`/projects/${projectId}/update`}>
          <button type="submit">Update Project</button>
        </Link>
        <div>
          {robots ? (
            robots.map((robot) => {
              return (
                <div key={robot.id} className="robots-wrapper">
                  <div className="robots">
                    <Link to={`/robots/${robot.id}`}>
                      <img
                        src={robot.imageUrl}
                        alt={robot.name}
                        height="100"
                        width="100"
                      />
                      <h3>{robot.name}</h3>
                    </Link>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => this.props.deleteRobot(robot)}
                    >
                      Delete
                    </button>
                    <div>{robot.fuelType}</div>
                    <div>{robot.fuelLevel}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Robots</div>
          )}
        </div>
      </div>
    );
  }
}

// const mapState = (state) => {
//   return {
//     singleProject: state.project.selectedProject,
//   };
// };

const mapState = (state) => ({
  singleProject: state.project.selectedProject,
});

const mapDispatch = (dispatch) => ({
  getProject: (projectId) => dispatch(fetchSingleProject(projectId)),
});

export default connect(mapState, mapDispatch)(SingleProject);
