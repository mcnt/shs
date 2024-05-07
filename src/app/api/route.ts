import { Item, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

const prisma: PrismaClient = new PrismaClient();

interface FormData {
  get: (name: string) => unknown;
}

export const GET = async (req: NextRequest) => {
  const items = await prisma.item.findMany();
  return NextResponse.json({ data: items });
};

export const POST = async (req: NextRequest) => {
  let payload: string[];
  const formData: FormData | null = await req.formData();

  if (!formData) {
    return NextResponse.json(
      { error: "Sem arquivos enviados." },
      { status: 400 }
    );
  }

  const file: File | null = formData.get("file") as File | null;

  if (file instanceof File) {
    const buffer: ArrayBuffer = await file.arrayBuffer();

    const wb: XLSX.WorkBook = XLSX.read(buffer, { type: "buffer" });
    const worksheet: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
    const json: any[] = XLSX.utils.sheet_to_json(worksheet);

    payload = json;

    try {
      await prisma.item.createMany({
        data: json as Item[],
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Erro na inclusão dos dados" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json({ error: "Arquivo inválido." }, { status: 400 });
  }

  return NextResponse.json({
    upload: "success",
    data: payload,
  });
};
