import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AllRobots from "./AllRobots";
import AllProjects from "./AllProjects";
import SingleRobot from "./SingleRobot";
import Home from "./Home";
import SingleProject from "./SingleProject";
import UpdateRobot from "./UpdateRobot";
import UpdateProject from "./UpdateProject";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/Home">Home</Link>

          <Link to="/robots">Robots</Link>
          <Link to="/projects">Projects</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/robots" component={AllRobots} />
          <Route exact path="/projects" component={AllProjects} />
          <Route exact path="/robots/:robotId" component={SingleRobot} />
          <Route exact path="/projects/:projectId" component={SingleProject} />
          <Route exact path="/robots/:robotId/update" component={UpdateRobot} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
