import {
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useListItemContext } from "../data/item/Item";
import { useListContext, listDefault } from "../data/list/list";

export const ListOfLists = () => {
  const { all, create, update } = useListContext();
  const { all: allItems } = useListItemContext();

  const match = useRouteMatch();
  const history = useHistory();

  return (
    <List>
      {all.map((list) => {
        const theseItems = allItems.filter((item) => item.parentId === list.id);
        return (
          // <Item key={item.id} data={item} actions={rest} />
          <ListItem>
            {/* <Link to={match.url + "/" + list.id}> */}
            <Button
              onClick={() =>
                history.push(match.url + "/" + list.id, {
                  background: list.color,
                })
              }
            >
              <Card style={{ padding: 20, background: list.color }}>
                <TextField
                  value={list.title}
                  hiddenLabel={true}
                  onChange={(e) => update({ ...list, title: e.target.value })}
                  onClick={(e) => e.stopPropagation()}
                />
                <List>
                  {theseItems.map((item) => (
                    <ListItem>{item.title}</ListItem>
                  ))}
                </List>
              </Card>
              {/* </Link> */}
            </Button>
          </ListItem>
        );
      })}
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
