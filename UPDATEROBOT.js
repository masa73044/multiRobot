import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateRobot, fetchSingleRobot } from "../redux/singleRobot";
import { fetchProjects } from "../redux/projects";

const intialState = {
  name: "",
  fuelType: "",
  fuelLevel: 100,
  imageUrl: "",
};

class EditRobot extends React.Component {
  constructor(props) {
    super(props);
    this.state = intialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateRobot = this.handleUpdateRobot.bind(this);
    this.assignProject = this.assignProject.bind(this);
    this.unassignProject = this.unassignProject.bind(this);
  }

  componentDidMount() {
    const { robotId } = this.props.match.params;
    this.props.getSingleRobot(robotId);
    this.props.fetchAllProjects();

    const { singleRobot } = this.props;
    if (singleRobot.id) {
      this.setState({
        name: singleRobot.name,
        fuelLevel: singleRobot.fuelLevel,
        imageUrl: singleRobot.imageUrl,
        fuelType: singleRobot.fuelType,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { singleRobot } = this.props;
    if (!prevProps.singleRobot.id && singleRobot.id) {
      this.setState({
        name: singleRobot.name,
        fuelLevel: singleRobot.fuelLevel,
        imageUrl: singleRobot.imageUrl,
        fuelType: singleRobot.fuelType,
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleUpdateRobot(evt) {
    evt.preventDefault();
    this.props.updateRobot({ ...this.props.singleRobot, ...this.state });
  }

  assignProject(evt) {
    this.props.updateRobot(
      { ...this.props.singleRobot, ...this.state },
      { title: evt.target.value, assign: true }
    );
  }

  unassignProject(projectTitle) {
    this.props.updateRobot(
      { ...this.props.singleRobot, ...this.state },
      { title: projectTitle, assign: false }
    );
  }

  render() {
    const { name, fuelType, fuelLevel, imageUrl } = this.state;
    const { handleChange, handleUpdateRobot, assignProject, unassignProject } =
      this;
    let singleRobotsProjects = this.props.singleRobot.projects;
    if (!singleRobotsProjects) {
      singleRobotsProjects = [];
    }
    return (
      <div className="edit-form">
        <form onSubmit={handleUpdateRobot} className="edit-form-container">
          <div className="form-child">
            <label htmlFor="name">Robot Name:</label>
            <input name="name" onChange={handleChange} value={name} required />
          </div>

          <div className="form-child">
            <label htmlFor="name">Fuel Type:</label>
            <select name="fuelType" onChange={handleChange} value={fuelType}>
              <option value="gas">gas</option>
              <option value="diesel">diesel</option>
              <option value="electric">electric</option>
            </select>
          </div>

          <div className="form-child">
            <label htmlFor="fuelLevel">Fuel Level:</label>
            <input name="fuelLevel" onChange={handleChange} value={fuelLevel} />
          </div>

          <div className="form-child">
            <label htmlFor="imageUrl">Robot Image URL:</label>
            <input name="imageUrl" onChange={handleChange} value={imageUrl} />
          </div>

          <div className="form-child">
            <button type="submit" className="add-button">
              Save Changes
            </button>
          </div>
        </form>

        <h1>Projects assinged to {this.props.singleRobot.name}</h1>
        <form onSubmit={assignProject} className="form-assigned">
          <select>
            <option selected disabled>
              Select project...
            </option>
            {this.props.allProjects.map((project) => (
              <option key={project.id} value={project.title}>
                {project.title}
              </option>
            ))}
          </select>
          <button type="submit" className="add-button">
            Save Changes
          </button>
        </form>

        {singleRobotsProjects.length ? (
          <div className="list-of-projects">
            {singleRobotsProjects.map((project) => {
              return (
                <div key={project.id} className="single-project">
                  <Link to={`/projects/${project.id}`}>
                    <h2>Title: {project.title}</h2>
                    <div>Completed: {project.completed.toString()}</div>
                    <div>Deadline: {project.deadline.slice(0, 10)}</div>
                    <div>Priortiy: {project.priority}</div>
                  </Link>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => unassignProject(project.id)}
                  >
                    unassign from robot
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="none-in-database">
            Sorry there are no projects assigned to this robot
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleRobot: state.robot.selectedRobot,
    allProjects: state.projects.all,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleRobot: (robotId) => dispatch(fetchSingleRobot(robotId)),
    updateRobot: (robot) => dispatch(updateRobot(robot)),
    fetchAllProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapState, mapDispatch)(EditRobot);
