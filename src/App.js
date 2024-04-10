import {Switch,Route,Redirect} from "react-router-dom"
import './App.css';
import HomeRoute from "./components/HomeRoute";
import SearchRoute from "./components/SearchRoute";
import MovieItemDetails from "./components/MovieItemDetails";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Switch>
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/search" component={SearchRoute} />
    <Route exact path="/movies/:id" component={MovieItemDetails} />
    <Route exact path="/notfound" component={NotFound} />
    <Redirect to="/notfound" />
      </Switch>
    </div>
  );
}

export default App;
