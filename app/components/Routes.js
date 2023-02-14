import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllRobots from "./AllRobots";
import AllProjects from "./AllProjects";
import { Link } from "react-router-dom";
import Home from "./Home";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          Welcome!
          <Link to="/">Home</Link>
          <Link to="/robots">Robots</Link>
          <Link to="/projects">Projects</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/robots" component={AllRobots} />
          <Route exact path="/projects" component={AllProjects} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
