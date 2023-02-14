import React from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../redux/projects";

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
        <div>test</div>
        {projects.length ? (
          projects.map((project) => (
            <ul key={project.id}>
              <li>{project.title}</li>
              <li>{project.deadline}</li>
            </ul>
          ))
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

const mapDispatch = (dispatch) => ({
  getProjects: () => dispatch(fetchProjects()),
});

export default connect(mapState, mapDispatch)(AllProjects);
