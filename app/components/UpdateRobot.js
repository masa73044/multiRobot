import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleRobot } from "../redux/singleRobot";
import { intUpdateRobot } from "../redux/robots";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export class UpdateRobot extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      name: "",
      fuelType: "",
      fuelLevel: 50,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // console.log(this.props.match.params.robotId, "idd");
    this.props.getRobot(this.props.match.params.robotId);
    const { singleRobot } = this.props;
    if (singleRobot.id) {
      this.setState({
        name: singleRobot.name,
        fuelLevel: singleRobot.fuelLevel,
        fuelType: singleRobot.fuelType,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { singleRobot } = this.props;
    console.log(prevProps.singleRobot.id, "prev");
    if (!prevProps.singleRobot.id) {
      this.setState({
        name: singleRobot.name,
        fuelLevel: singleRobot.fuelLevel,
        fuelType: singleRobot.fuelType,
      });
    }
  }

  handleChange(evt) {
    console.log("target", evt.target);

    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log("singleRobot", { ...this.props.singleRobot, ...this.state });
    this.props.updateRobot({ ...this.props.singleRobot, ...this.state });
    this.props.history.push(`/robots/${this.props.match.params.robotId}`);
    // this.props.history.push(`/robots/`);
  }

  render() {
    const { singleRobot } = this.props;
    const { name, fuelLevel, fuelType } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form onSubmit={handleSubmit} className="updateForm">
          <h2>{`Update Robot: ${singleRobot.name}`}</h2>

          <label htmlFor="name">Name:</label>
          <input name="name" onChange={handleChange} value={name} required />

          <label htmlFor="fuelType">Fuel Type: </label>
          <select name="fuelType" onChange={handleChange} value={fuelType}>
            <option value="gas">gas</option>
            <option value="diesel">diesel</option>
            <option value="electric">electric</option>
          </select>

          <label htmlFor="fuelLevel">Fuel Level: </label>
          <input name="fuelLevel" onChange={handleChange} value={fuelLevel} />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  singleRobot: state.robot.selectedRobot,
});

// const mapDispatch = (dispatch, { history }) => {
//   return {
//     updateRobot: (robot) => dispatch(intUpdateRobot(robot, history)),
//     getRobot: (robotId) => dispatch(fetchSingleRobot(robotId)),
//   };
// };

const mapDispatch = (dispatch) => ({
  updateRobot: (robot) => dispatch(intUpdateRobot(robot)),
  getRobot: (robotId) => dispatch(fetchSingleRobot(robotId)),
});

export default connect(mapState, mapDispatch)(UpdateRobot);
