// pages/api/users/[id].ts
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
      return res.status(400).json({ error: "Invalid user id" });
    }

    switch (req.method) {
      case "GET": {
        const user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
      }

      case "PUT": {
        const { name, email } = req.body;
        const updatedUser = await prisma.user.update({
          where: { id },
          data: { name, email },
        });
        return res.status(200).json(updatedUser);
      }

      case "DELETE": {
        await prisma.user.delete({
          where: { id },
        });
        return res.status(204).end();
      }

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
