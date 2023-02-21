import React, { Component } from "react";
import { connect } from "react-redux";
import { intUpdateProject, fetchSingleRobot } from "../redux/projects";

export class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      completed: false,
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
    this.props.updateProject({ ...this.props.singleProject, ...this.state });
  }

  render() {
    const { title, completed } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Update Project</h2>
          <label htmlFor="title">title:</label>
          <input name="title" onChange={handleChange} value={title} />

          <label htmlFor="completed">Competion Status:</label>
          <input name="completed" onChange={handleChange} value={completed} />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  singleProject: state.project.selectedProject,
});

const mapDispatch = (dispatch) => ({
  updateProject: (project) => dispatch(intUpdateProject(project)),
  // getProject: (robotId) => dispatch(fetchSingleRobot(robotId)),
});

export default connect(mapState, mapDispatch)(UpdateProject);
