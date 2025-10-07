import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { toFetchHeaders } from "@/lib/headers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await auth.api.getSession({ headers: toFetchHeaders(req.headers) });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.query;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "Invalid income id" });
    }

    if (req.method === "GET") {
      const income = await prisma.income.findUnique({
        where: { id },
      });
      if (!income) return res.status(404).json({ error: "Income not found" });
      return res.status(200).json(income);
    }

    if (req.method === "PUT") {
      const { description, amount, date } = req.body;
      const updatedIncome = await prisma.income.update({
        where: { id },
        data: {
          description,
          amount,
          date: date ? new Date(date) : undefined,
        },
      });
      return res.status(200).json(updatedIncome);
    }

    if (req.method === "DELETE") {
      await prisma.income.delete({
        where: { id },
      });
      return res.status(204).end();
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
