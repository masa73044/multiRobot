import React from "react";
import { connect } from "react-redux";
import { fetchRobots } from "../redux/robots";

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
class AllRobots extends React.Component {
  componentDidMount() {
    console.log("CDM");

    this.props.getRobots();
  }

  render() {
    const { robots } = this.props;
    console.log("robots render >", robots);

    return (
      <div>
        {robots.map((robot) => (
          <ul key={robot.id}>
            <li>{robot.name}</li>
            <li>{robot.imageUrl}</li>
          </ul>
        ))}
        <h1>robots comp</h1>
      </div>
    );
  }
}

const mapState = (state) => ({
  robots: state.robots.all,
});

const mapDispatch = (dispatch) => ({
  getRobots: () => dispatch(fetchRobots()),
});

export default connect(mapState, mapDispatch)(AllRobots);
