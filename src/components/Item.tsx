import {
  Box,
  Card,
  Icon,
  IconButton,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React from "react";
import { ListItemContextProps, ListItemData } from "../data/item/Item";
import { Delete, FileCopy, MoreVert } from "@material-ui/icons/";

const useStyles = makeStyles({
  card: {
    padding: 10,
  },
});

export const Item = ({
  data,
  actions,
}: {
  data: ListItemData;
  actions?: Omit<ListItemContextProps, "all" | "create">;
}) => {
  const classes = useStyles();
  return (
    <ListItem>
      <Card className={classes.card}>
        <ListItemText>
          <TextField
            value={data.title}
            onChange={(e) =>
              actions?.update({ ...data, title: e.target.value })
            }
            label="Titel"
          />
          <IconButton
            onClick={() => actions?.duplicate(data)}
            edge="end"
            aria-label="copy"
          >
            <FileCopy />
          </IconButton>
          <IconButton
            onClick={() => actions?.remove(data)}
            edge="end"
            aria-label="delete"
          >
            <Delete />
          </IconButton>
          <IconButton edge="end" aria-label="more">
            <MoreVert />
          </IconButton>
        </ListItemText>
      </Card>
    </ListItem>
  );
};
