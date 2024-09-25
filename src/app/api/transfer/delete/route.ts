// /pages/api/transfer/accept.ts
import Transfer from "@/lib/models/Transfer";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { trId, userId } = await req.json();
    console.log(trId, userId);

    try {
        await connectToDB();
        // Find the transfer by ID and update the request status to "accepted"
        const transfer = await Transfer.findById(trId);
        if (!transfer) {
            return new NextResponse("Transfer not found", { status: 404 });
        }

        // Find the request with matching userId and update its status
        const request = transfer.requests.find((r: any) => r.userId.toString() === userId);
        if (request) {
            request.status = "deleted";
            transfer.updatedAt = new Date(); // Update the updatedAt field
            await transfer.save();

            return new NextResponse("Request status updated to accepted");
        } else {
            return new NextResponse("Request not found", { status: 404 });
        }
    } catch (error) {
        return new NextResponse("Error updating request", { status: 500 });
    }
}
