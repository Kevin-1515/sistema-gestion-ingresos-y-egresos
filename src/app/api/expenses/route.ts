import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {
    try{
        const session = await auth.api.getSession({headers: req.headers});
        if (!session) return NextResponse.json({error: "Unauthorized"},{status:401});

        const body = await req.json();
        const { description,amount,date} = body;
        const expense = await prisma.expense.create({
            data: {
                description,
                amount,
                date: date ? new Date(date) : new Date(),
                userId: session.user.id,
            },
        });
        return NextResponse.json(expense, {status: 201});
    } catch(error){
        console.error(error);
        return NextResponse.json({error: "error al crear egreso"}, {status: 500});
    }
}



export async function GET(req: Request){
    try{
        const session = await auth.api.getSession({headers: req.headers});
        if (!session) return NextResponse.json({error:"Unauthorized"},{status: 401});
        const expenses = await prisma.expense.findMany({
            where: {userId: session.user.id},
            orderBy: {date: "desc"},
        });
        return NextResponse.json(expenses);
    }catch(error){
        console.error(error);
        return NextResponse.json({error: "error al obtener egresos"}, {status: 500});
    }
}
/*
export async function PUT(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { id, description, amount, date } = body;

        const updatedExpense = await prisma.expense.update({
            where: { id },
            data: {
                description,
                amount,
                date: date ? new Date(date) : undefined,
            },
        });

        return NextResponse.json(updatedExpense);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "error al actualizar egreso" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

        const deletedExpense = await prisma.expense.delete({ where: { id } });

        return NextResponse.json(deletedExpense);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "error al eliminar egreso" }, { status: 500 });
    }
}*/