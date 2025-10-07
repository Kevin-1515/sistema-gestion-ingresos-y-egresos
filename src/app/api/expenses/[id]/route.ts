import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const income = await prisma.income.findFirst({
      where: { id: params.id, userId: session.user.id },
    });

    if (!income) return NextResponse.json({ error: "Income not found" }, { status: 404 });

    return NextResponse.json(income);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching income" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { description, amount, date } = body;

    const updatedIncome = await prisma.income.update({
      where: { id: params.id },
      data: {
        description,
        amount,
        date: date ? new Date(date) : undefined,
      },
    });

    return NextResponse.json(updatedIncome);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating income" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const deletedIncome = await prisma.income.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedIncome);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting income" }, { status: 500 });
  }
}
