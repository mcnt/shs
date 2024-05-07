export interface ColumnItem {
  title: string;
  dataIndex: string;
  key: string;
}

export interface ListItem {
  id: string;
  code: string;
  description: string;
  quantity: number;
  price: number;
  total_price: number;
}

export interface ListContextState {
  data: ListItem[];
  updateList: (newData: ListItem[]) => void;
}
