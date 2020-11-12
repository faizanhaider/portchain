import React from "react";
import { Route, Switch } from "react-router-dom";

const Routes: React.SFC = () => (
  <div>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <div>Homepage</div>
        )}
      />
      <Route
        path="/vessels"
        render={() => (
          <div>Vessels</div>
        )}
      />
    </Switch>
  </div>
);

export default Routes;
