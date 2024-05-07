"use client";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";

const acceptedTypes: string[] = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

function checkType(type: string) {
  return acceptedTypes.includes(type);
}

const uploadExcel = async (options: any) => {
  const { file } = options;

  const fmData = new FormData();

  fmData.append("file", file);
  try {
    await fetch("api", {
      method: "POST",
      body: fmData,
    });

    message.success("Arquivo foi enviado com succeso!");
  } catch (err) {
    message.error("Ocorreu algum erro, envie novamente em instantes.");
  }
};

const props: UploadProps = {
  accept: acceptedTypes.join(","),
  customRequest: uploadExcel,
  showUploadList: false,
  multiple: false,
  beforeUpload: (file) => {
    const isExcel = checkType(file.type);

    if (!isExcel) {
      message.error(`${file.name} não é lido como excel`);
    }

    const formData = new FormData();
    formData.append("file", file);

    return isExcel || Upload.LIST_IGNORE;
  },
};

const ButtonUpload = () => {
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Subir EXCEL</Button>
    </Upload>
  );
};

export default ButtonUpload;
