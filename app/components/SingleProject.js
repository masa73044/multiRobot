import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProject } from "../redux/singleProject";
import UpdateProject from "./UpdateProject";

export class SingleProject extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.projectId);
  }
  render() {
    const { singleProject } = this.props;
    console.log(singleProject, "SG");
    console.log(`Hit`, singleProject.completed);
    return (
      <div>
        <div>{singleProject.title}</div>
        <div>{singleProject.deadline}</div>
        <div>{singleProject.priority}</div>
        <div>{singleProject.description}</div>
        <div>{singleProject.completed}</div>
        <UpdateProject />
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
