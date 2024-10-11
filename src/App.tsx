import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Amplify from "aws-amplify";
import Signup from "./components/Signup";
import Confirmation from "./components/Confirmation";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { COGNITO } from "./configs/aws";
import ProtectedRoute from "./components/ProtectedRoute";
import TodosList from "./components/TodosList";
import "bootstrap/dist/css/bootstrap.min.css";

Amplify.configure({
  aws_cognito_region: COGNITO.REGION,
  aws_user_pools_id: COGNITO.USER_POOL_ID,
  aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
  aws_cognito_identity_pool_id: COGNITO.ID_POOL_ID
});

const App: React.FC = () => {
  return (
    <Router>
      <Card style={{ width: 1000, margin: "100px auto", padding: "40px" }}>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
          <Route path="/list">
             <ProtectedRoute component={TodosList} />
          </Route>
          <Route path="/">
            <ProtectedRoute component={TodosList} />
          </Route>
        </Switch>
      </Card>
    </Router>
  );
};

export default App;
