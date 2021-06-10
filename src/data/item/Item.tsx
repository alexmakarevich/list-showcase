import { ReactNode, useState } from "react";
import { v4 as uuid } from "uuid";
import { createContextDefined } from "../../utils/hooks";

export interface ListItemData {
  id: string;
  title: string;
  parentId: string;
}

export const initialItems: ListItemData[] = [
  { id: uuid(), title: "one", parentId: "first" },
  { id: uuid(), title: "two", parentId: "first" },
  { id: uuid(), title: "three", parentId: "second" },
  { id: uuid(), title: "four", parentId: "second" },
];

export const itemDefault = (parentId: string): ListItemData => ({
  id: uuid(),
  title: "",
  parentId,
});

export interface ListItemContextProps {
  all: ListItemData[];
  create: (i: ListItemData) => void;
  update: (i: ListItemData) => void;
  duplicate: (i: ListItemData) => void;
  remove: (i: ListItemData) => void;
}

const [useListItemContext, Provider] =
  createContextDefined<ListItemContextProps>();

interface Props {
  children: ReactNode;
}

const ListItemContextProvider = ({ children }: Props) => {
  const [all, setItems] = useState<ListItemData[]>(initialItems);
  const create = (newItem: ListItemData) =>
    setItems((items) => [...items, newItem]);
  const update = (updatedItem: ListItemData) =>
    setItems((items) => {
      const itemIndex = items.findIndex((item) => item.id === updatedItem.id);
      if (itemIndex === -1) {
        throw "item not found";
      }
      return [
        ...items.slice(0, itemIndex),
        updatedItem,
        ...items.slice(itemIndex + 1),
      ];
    });
  const duplicate = (itemToDupe: ListItemData) =>
    setItems((items) => [...items, itemToDupe]);
  const remove = (itemToRemove: ListItemData) =>
    setItems((items) => {
      const itemIndex = items.findIndex((item) => item.id === itemToRemove.id);
      if (itemIndex === -1) {
        throw "item not found";
      }
      return [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)];
    });

  return (
    <Provider value={{ all, create, update, duplicate, remove }}>
      {children}
    </Provider>
  );
};
export { useListItemContext, ListItemContextProvider };
