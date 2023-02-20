import React from "react";
import { connect } from "react-redux";
import { fetchProjects, intDeleteProject } from "../redux/projects";
import { Link } from "react-router-dom";
import AddProject from "./AddProject";

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const { projects } = this.props;
    return (
      <div>
        <AddProject />
        {projects.length ? (
          projects.map((project) => {
            return (
              <div key={project.id}>
                <Link to={`/projects/${project.id}`}>
                  <li>title: {project.title}</li>
                </Link>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => this.props.deleteProject(project)}
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

const mapState = (state) => ({
  projects: state.projects.all,
});

const mapDispatch = (dispatch) => {
  return {
    getProjects: () => dispatch(fetchProjects()),
    deleteProject: (project) => dispatch(intDeleteProject(project.id)),
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
