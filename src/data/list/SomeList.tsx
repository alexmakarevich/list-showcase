import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { AddCircleOutlineOutlined, SpaceBar } from "@material-ui/icons";
import { Item } from "../../components/Item";
import { itemDefault, useListItemContext } from "../item/Item";

export const SomeList = () => {
  const { all, create, ...rest } = useListItemContext();

  return (
    <List>
      {all.map((item) => (
        <Item key={item.id} data={item} actions={rest} />
      ))}
      <ListItem>
        <IconButton onClick={() => create(itemDefault("any"))}>
          <AddCircleOutlineOutlined />
          <div style={{ width: 10, height: 10 }} />
          <ListItemText>Hinzufügen</ListItemText>
        </IconButton>
      </ListItem>
    </List>
  );
};
