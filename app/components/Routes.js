import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AllRobots from "./AllRobots";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>Welcome!</nav>
        <main>
          <h1>
            Welcome to StackBot Project Management: your robot employees are
            awaiting assignments!
          </h1>
          <AllRobots />
          <p>This seems like a nice place to get started with some Routes!</p>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
