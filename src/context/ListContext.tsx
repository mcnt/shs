import { ListContextState } from "@/interfaces/TableInterface";
import { createContext } from "react";

const ListContext = createContext<ListContextState>({
  data: [],
  updateList: () => {},
});

export default ListContext;
