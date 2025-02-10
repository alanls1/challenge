/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const words = async (req: Request, res: Response) => {
  try {
    const limit = 30;
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * limit;
    const endIndex = offset + limit;

    const filePath = path.join(__dirname, "../words_dictionary.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const lines = fileContent.split("\n ");

    const paginatedData = lines.slice(offset, endIndex);

    res.json({
      data: paginatedData,
      currentPage: page,
      totalPages: Math.ceil(lines.length / limit),
      totalItems: lines.length,
    });
  } catch (error) {
    console.log(error);
  }
};
