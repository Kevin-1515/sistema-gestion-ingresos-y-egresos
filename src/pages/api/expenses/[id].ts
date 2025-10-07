import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const expense = await prisma.expense.findFirst({
      where: { id: params.id, userId: session.user.id },
    });

    if (!expense)
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });

    return NextResponse.json(expense);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching expense" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { description, amount, date } = body;

    const updatedExpense = await prisma.expense.update({
      where: { id: params.id },
      data: {
        description,
        amount,
        date: date ? new Date(date) : undefined,
      },
    });

    return NextResponse.json(updatedExpense);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating expense" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const deletedExpense = await prisma.expense.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedExpense);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting expense" }, { status: 500 });
  }
}
