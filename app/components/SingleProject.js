import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProject } from "../redux/singleProject";

export class SingleProject extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.projectId);
  }
  render() {
    const { singleProject } = this.props;
    return (
      <div>
        <h3>{singleProject.title}</h3>
        <h3>{singleProject.deadline}</h3>
        <h3>{singleProject.priority}</h3>
        <h3>{singleProject.description}</h3>
      </div>
    );
  }
}
// - [ ] The project's title, deadline, priority, description

const mapState = (state) => {
  return {
    singleProject: state.project.selectedProject,
  };
};

const mapDispatch = (dispatch) => ({
  getProject: (projectId) => dispatch(fetchSingleProject(projectId)),
});

export default connect(mapState, mapDispatch)(SingleProject);
