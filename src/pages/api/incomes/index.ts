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

    if (req.method === "POST") {
      const { description, amount, date } = req.body;
      const income = await prisma.income.create({
        data: {
          description,
          amount,
          date: date ? new Date(date) : new Date(),
          userId: session.user.id,
        },
      });
      return res.status(201).json(income);
    }

    if (req.method === "GET") {
      const incomes = await prisma.income.findMany({
        where: { userId: session.user.id },
        orderBy: { date: "desc" },
      });
      return res.status(200).json(incomes);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
