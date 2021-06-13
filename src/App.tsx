import "./App.css";
import { Button, Container } from "@material-ui/core";
import { ListItemContextProvider } from "./data/item/Item";
import { ListContextProvider, useListContext } from "./data/list/list";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
  matchPath,
} from "react-router-dom";
import React from "react";
import { ListOfLists } from "./components/ListOfLists";
import { SomeList } from "./components/SomeList";

function App() {
  return (
    <div className="App">
      <ListItemContextProvider>
        <ListContextProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ListContextProvider>
      </ListItemContextProvider>
    </div>
  );
}

export default App;

const Home = () => {
  const history = useHistory();
  return (
    <Button
      color={"primary"}
      variant={"contained"}
      onClick={() => history.push("/lists")}
    >
      Start
    </Button>
  );
};
const AppRoutes = () => {
  const history = useHistory();

  const location = useLocation();
  const { pathname } = location;

  const backPathname = pathname.slice(0, pathname.lastIndexOf("/"));

  const { all } = useListContext();

  const match = matchPath<{ listId: string }>(history.location.pathname, {
    path: "/lists/:listId",
  });
  const list = all.find((list) => list.id === match?.params.listId);

  return (
    <Container
      style={{
        padding: 20,
        background:
          list?.color ?? (pathname === "/" ? "darkgray" : "lightgray"),
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      {pathname !== "/" && (
        <div style={{ textAlign: "left" }}>
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={() => history.push(backPathname)}
          >
            Zurück
          </Button>
        </div>
      )}
      <Switch>
        <Route path="/lists/:listId">
          {list ? <SomeList list={list} /> : <>list not found</>}
        </Route>
        <Route path="/lists">
          <ListOfLists />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  );
};
