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
    console.log(singleProject, "SG");
    let { robots } = singleProject;
    console.log(robots, "test");

    const completed = singleProject.completed ? "true" : "false";
    return (
      <div>
        <div>Title: {singleProject.title}</div>
        <div>Completion status: {completed}</div>
        <UpdateProject />
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
