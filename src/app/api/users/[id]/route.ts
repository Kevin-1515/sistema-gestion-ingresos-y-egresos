import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });


    const userDb = await prisma.user.findUnique({
      where: { id: session?.user.id }
    });

    if (!session || !userDb || userDb.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}



export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    const userDb = await prisma.user.findUnique({
      where: { id: session?.user.id }
    });

    if (!session || !userDb || userDb.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, role } = body;

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { name, email, role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    const userDb = await prisma.user.findUnique({
      where: { id: session?.user.id }
    });

    if (!session || !userDb || userDb.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}