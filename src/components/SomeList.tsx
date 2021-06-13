import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import React from "react";
import { useListItemContext, itemDefault } from "../data/item/Item";
import { ListData } from "../data/list/list";
import { Item } from "./Item";

interface SomeListProps {
  list: ListData;
}

/**
 * awakward name to avoid clashes with material-ui component
 * @returns
 */
export const SomeList = ({ list }: SomeListProps) => {
  const { all, create, ...rest } = useListItemContext();

  return (
    <div>
      <Typography variant="h3" component="h3" gutterBottom align={"left"}>
        {list.title}
      </Typography>
      <List>
        {all
          .filter((item) => item.parentId === list.id)
          .map((item) => (
            <Item key={item.id} data={item} actions={rest} />
          ))}
        <ListItem>
          <IconButton onClick={() => create(itemDefault(list.id))}>
            <AddCircleOutlineOutlined />
            <div style={{ width: 10, height: 10 }} />
            <ListItemText>Hinzufügen</ListItemText>
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
};
