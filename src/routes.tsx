import React from "react";
import { Route, Switch } from "react-router-dom";
import PortCallStats from "./containers/PortCallStats";

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <PortCallStats />} />
        <Route path="/notFound" render={() => <div>Not Found</div>} />
      </Switch>
    </div>
  );
}

export default Routes;
