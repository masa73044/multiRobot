import React, { Component } from "react";
import { connect } from "react-redux";
import { intCreateProject } from "../redux/projects";

export class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      deadline: "",
      priority: 0,
      completed: false,
      description: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProject({ ...this.state });
  }

  render() {
    const { title, completed, priority, deadline, description } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div id="container">
        <div id="navbar"></div>
        <form onSubmit={handleSubmit}>
          <h2>Add Project</h2>
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createProject: (project) => dispatch(intCreateProject(project, history)),
});

export default connect(null, mapDispatchToProps)(AddProject);
