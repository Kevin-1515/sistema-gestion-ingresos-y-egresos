import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";



export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

   
    const userDb = await prisma.user.findUnique({
      where: { id: session?.user.id }
    });

    if (!session || !userDb || userDb.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    const userDb = await prisma.user.findUnique({
      where: { id: session?.user.id }
    });
    console.log("session", session);
    if (!session || !userDb || userDb.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, role } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email, 
        role,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}