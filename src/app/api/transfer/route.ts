import Transfer from "@/lib/models/Transfer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const user = await Transfer.create(data)
        return new NextResponse(user)
    } catch (error) {
        console.log('[error while creating new transfer]', error);
        return new NextResponse('error while creating new transfer', { status: 500 })
    }
}
