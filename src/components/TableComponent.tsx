"use client";

import { ColumnItem } from "@/interfaces/TableInterface";
import { Table } from "antd";
import { useEffect, useState } from "react";

const ListItems: React.FC = () => {
  const columns: ColumnItem[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total",
      dataIndex: "total_price",
      key: "total_price",
    },
  ];

  const [data, setData] = useState<object[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = await fetch("/api/");
        const jsonData = await payload.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Erro ao obter dados da API:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return <Table dataSource={data} columns={columns} />;
};

export default ListItems;
