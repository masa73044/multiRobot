import React, { Component } from "react";
import { connect } from "react-redux";
import { intUpdateProject } from "../redux/projects";
import { fetchRobots } from "../redux/robots";
import { fetchSingleProject } from "../redux/singleProject";

export class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      deadline: "",
      priority: 0,
      completed: false,
      description: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handlAddChange = this.handlAddChange.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getRobots();
    this.props.getProject(this.props.match.params.projectId);
    const { singleProject } = this.props;
    if (singleProject.id) {
      this.setState({
        title: singleProject.title,
        deadline: singleProject.deadline,
        priority: singleProject.priority,
        completed: singleProject.completed,
        description: singleProject.description,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { singleProject } = this.props;
    if (!prevProps.singleProject.id && !prevProps.robots) {
      this.setState({
        title: singleProject.title,
        deadline: singleProject.deadline,
        priority: singleProject.priority,
        completed: singleProject.completed,
        description: singleProject.description,
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log({ ...this.props.singleProject, ...this.state });
    this.props.updateProject({ ...this.props.singleProject, ...this.state });
    this.props.history.push(`/projects/${this.props.match.params.projectId}`);
  }

  handlAddChange(evt) {}

  handleAddSubmit(evt) {}

  render() {
    const { title, completed, priority, deadline, description } = this.state;
    const { handleSubmit, handleChange, handlAddChange, handleAddSubmit } =
      this;
    const { robots, singleProject } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h2>{`Update Project: ${singleProject.title}`}</h2>
          <label htmlFor="title">title:</label>
          <input name="title" onChange={handleChange} value={title} />

          <label htmlFor="deadline">deadline:</label>
          <input name="deadline" onChange={handleChange} value={deadline} />

          <label htmlFor="priority">priority:</label>
          <input name="priority" onChange={handleChange} value={priority} />

          <label htmlFor="completed">Competion Status:</label>
          <select name="completed" onChange={handleChange} value={completed}>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>

          <label htmlFor="description">description:</label>
          <input
            name="description"
            onChange={handleChange}
            value={description}
          />

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
  getProject: (projectId) => dispatch(fetchSingleProject(projectId)),
  updateProject: (project) => dispatch(intUpdateProject(project)),
  getRobots: () => dispatch(fetchRobots()),
});

export default connect(mapState, mapDispatch)(UpdateProject);
