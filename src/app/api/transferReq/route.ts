import Transfer from "@/lib/models/Transfer";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Ensure the database connection is established
        await connectToDB();

        // Parse the request data
        const data = await req.json();

        // Perform basic validation (optional but recommended)
        if (!data.userId || !data.requestDetails) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        // Create the transfer
        const transfer = await Transfer.create(data);

        // Return the created transfer as a JSON response
        return new NextResponse(JSON.stringify(transfer), { status: 201 });
    } catch (error) {
        console.log('[Error while creating new transfer]', error);
        return new NextResponse('Error while creating new transfer', { status: 500 });
    }
}
