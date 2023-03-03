import React from "react";
import { connect } from "react-redux";
import { fetchRobots, intDeleteRobot } from "../redux/robots";
import { Link } from "react-router-dom";
import AddRobot from "./AddRobot";

//test

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends React.Component {
  componentDidMount() {
    this.props.getRobots();
  }

  render() {
    const { robots } = this.props;
    //"No Robots"

    return (
      <div>
        <AddRobot />
        <div id="robot-container">
          {robots.length ? (
            robots.map((robot) => {
              return (
                <div key={robot.id} className="robots-wrapper">
                  <div className="robots">
                    <Link to={`/robots/${robot.id}`}>
                      <img
                        src={robot.imageUrl}
                        alt={robot.name}
                        height="100"
                        width="100"
                      />
                      <h3>{robot.name}</h3>
                    </Link>
                    <div>{robot.fuelType}</div>
                    <div>{robot.fuelLevel}</div>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => this.props.deleteRobot(robot)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Robots</div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  robots: state.robots.all,
});

const mapDispatch = (dispatch) => {
  return {
    getRobots: () => dispatch(fetchRobots()),
    deleteRobot: (robot) => dispatch(intDeleteRobot(robot.id)),
  };
};

export default connect(mapState, mapDispatch)(AllRobots);
