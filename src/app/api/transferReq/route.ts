import Transfer from "@/lib/models/Transfer";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Ensure the database connection is established
        await connectToDB();

        // Parse the request data
        const data = await req.json();
        // Create the transfer
        const transfer = await Transfer.create(data);

        // Return the created transfer as a JSON response
        return new NextResponse(JSON.stringify(transfer), { status: 201 });
    } catch (error) {
        console.log('[Error while creating new transfer]', error);
        return new NextResponse('Error while creating new transfer', { status: 500 });
    }
}
