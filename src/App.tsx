import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { List } from "@material-ui/core";
import { ListItemContextProvider, useListItemContext } from "./data/item/Item";
import { SomeList } from "./data/list/SomeList";
import { ListOfLists } from "./data/list/ListOfLists";
import { ListContextProvider } from "./data/list/list";

function App() {
  return (
    <div className="App">
      <ListItemContextProvider>
        <ListContextProvider>
          <ListOfLists />
          <SomeList />
        </ListContextProvider>
      </ListItemContextProvider>
    </div>
  );
}

export default App;
