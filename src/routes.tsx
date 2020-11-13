import React from "react";
import { Route, Switch } from "react-router-dom";
import Vessels from "./containers/Vessels";

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <Vessels />} />
        <Route path="/notFound" render={() => <div>Not Found</div>} />
      </Switch>
    </div>
  );
}

export default Routes;
