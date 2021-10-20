import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import FormLogin from "./pages/Login";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
 
  const isUser = () => {
    return localStorage.getItem('Token');
  }

  return (
    <Switch>
      <Route path="/" exact={true}>
        <FormLogin />
      </Route>
      <Route path="/home">{isUser ? <Home /> : <Redirect to="/" />}</Route>
      <Route path="/create">{isUser ? <Create /> : <Redirect to="/" />}</Route>
      <Route path="/detail">{isUser ? <Detail /> : <Redirect to="/" />}</Route>
      <Route path="/edit">{isUser ? <Edit /> : <Redirect to="/" />}</Route>
    </Switch>
  );
}

export default App;
