import {
  Card,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { AddCircleOutlineOutlined, SpaceBar } from "@material-ui/icons";
import React from "react";
import { Item } from "../../components/Item";
import { useListItemContext } from "../item/Item";
import { useListContext, listDefault } from "./list";

export const ListOfLists = () => {
  const { all, create, update } = useListContext();

  return (
    <List>
      {all.map((item) => (
        // <Item key={item.id} data={item} actions={rest} />
        <Card style={{ padding: 20, background: item.color }}>
          <ListItem>
            <TextField
              value={item.title}
              onChange={(e) => update({ ...item, title: e.target.value })}
              label="Titel"
            />
          </ListItem>
        </Card>
      ))}
      <ListItem style={{ textAlign: "center" }}>
        <IconButton onClick={() => create(listDefault())}>
          <AddCircleOutlineOutlined />
          {/* <div style={{ width: 10, height: 10 }} />
          <ListItemText>Hinzufügen</ListItemText> */}
        </IconButton>
      </ListItem>
    </List>
  );
};
