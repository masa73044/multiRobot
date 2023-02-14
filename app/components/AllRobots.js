import React from "react";
import { connect } from "react-redux";
import { fetchRobots } from "../redux/robots";
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
        <div>test</div>
        {robots.length ? (
          robots.map((robot) => {
            return (
              <ul key={robot.id}>
                <li>{robot.name}</li>
                <img
                  src={robot.imageUrl}
                  alt={robot.name}
                  height="100"
                  width="100"
                />
              </ul>
            );
          })
        ) : (
          <div>No Robots</div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  robots: state.robots,
});

const mapDispatch = (dispatch) => ({
  getRobots: () => dispatch(fetchRobots()),
});

export default connect(mapState, mapDispatch)(AllRobots);
