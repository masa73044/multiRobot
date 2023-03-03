import React, { Component } from "react";
import { connect } from "react-redux";
import { intUpdateProject } from "../redux/projects";
import { fetchRobots } from "../redux/robots";

export class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      completed: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleAddSubmit = this.handleAddSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getRobots();
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

  handlAddChange(evt) {}

  handleAddSubmit(evt) {}

  render() {
    const { title, completed } = this.state;
    const { handleSubmit, handleChange, handleAddSubmit, handlAddChange } =
      this;
    const { robots } = this.props;
    console.log("test", robots);

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
        <div>
          <h2>Robots</h2>
          <select onChange={handlAddChange}>
            {robots.map((robot) => {
              return <option key={robot.id}>{robot.name}</option>;
            })}
          </select>
          <button type="button" onClick={handleAddSubmit}>
            Add Robot
          </button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  singleProject: state.project.selectedProject,
  robots: state.robots.all,
});

const mapDispatch = (dispatch) => ({
  updateProject: (project) => dispatch(intUpdateProject(project)),
  getRobots: () => dispatch(fetchRobots()),
});

export default connect(mapState, mapDispatch)(UpdateProject);
