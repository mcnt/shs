import TableComponent from "@/components/TableComponent";
import UploadComponent from "@/components/UploadComponent";
import { Divider } from "antd";

export default function Home() {
  return (
    <div>
      <UploadComponent />
      <Divider />
      <TableComponent />
    </div>
  );
}
