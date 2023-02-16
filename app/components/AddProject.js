import React, { Component } from "react";
import { connect } from "react-redux";
import { intCreateProject } from "../redux/projects";

export class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("hit");
    this.props.createProject({ ...this.state });
  }

  handleChange(evt) {
    console.log("event.target -->", evt.target);
    this.setState({
      [evt.target.title]: evt.target.value,
    });
  }

  render() {
    const { title } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div id="container">
        <div id="navbar">Add Prject</div>
        <label>
          Title:
          <input
            type="text"
            title="title"
            onChange={handleChange}
            value={title}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createProject: (project) => dispatch(intCreateProject(project, history)),
});

export default connect(null, mapDispatchToProps)(AddProject);
