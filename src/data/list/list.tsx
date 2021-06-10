import { colors } from "@material-ui/core";
import { ReactNode, useState } from "react";
import { v4 as uuid } from "uuid";
import { createContextDefined } from "../../utils/hooks";

export interface ListData {
  id: string;
  title: string;
  color: string;
}

const randomColor = () =>
  "rgb(" +
  Math.floor(Math.random() * 256) +
  "," +
  Math.floor(Math.random() * 256) +
  "," +
  Math.floor(Math.random() * 256) +
  ")";

export const initialLists: ListData[] = [
  { id: "first", title: "first", color: "#43f950" },
  { id: "second", title: "second", color: "#6060f9" },
  { id: uuid(), title: "third", color: randomColor() },
  { id: uuid(), title: "fourth", color: randomColor() },
];

export const listDefault = () => ({
  id: uuid(),
  title: "",
  color: randomColor(),
});

export interface ListContextProps {
  all: ListData[];
  create: (i: ListData) => void;
  update: (i: ListData) => void;
  duplicate: (i: ListData) => void;
  remove: (i: ListData) => void;
}

const [useListContext, Provider] = createContextDefined<ListContextProps>();

interface Props {
  children: ReactNode;
}

const ListContextProvider = ({ children }: Props) => {
  const [all, setLists] = useState<ListData[]>(initialLists);
  const create = (newList: ListData) =>
    setLists((lists) => [...lists, newList]);
  const update = (updatedList: ListData) =>
    setLists((lists) => {
      const listIndex = lists.findIndex((list) => list.id === updatedList.id);
      if (listIndex === -1) {
        throw "list not found";
      }
      return [
        ...lists.slice(0, listIndex),
        updatedList,
        ...lists.slice(listIndex + 1),
      ];
    });
  const duplicate = (listToDupe: ListData) =>
    setLists((lists) => [...lists, listToDupe]);
  const remove = (listToRemove: ListData) =>
    setLists((lists) => {
      const listIndex = lists.findIndex((list) => list.id === listToRemove.id);
      if (listIndex === -1) {
        throw "list not found";
      }
      return [...lists.slice(0, listIndex), ...lists.slice(listIndex + 1)];
    });

  return (
    <Provider value={{ all, create, update, duplicate, remove }}>
      {children}
    </Provider>
  );
};
export { useListContext, ListContextProvider };
