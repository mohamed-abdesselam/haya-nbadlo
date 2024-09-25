import Transfer from "@/lib/models/Transfer";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { trId, userId } = await req.json();

    try {
        await connectToDB();
        const transfer = await Transfer.findById(trId);
        if (!transfer) {
            return NextResponse.json({ message: "Transfer not found" }, { status: 404 });
        }

        // Find the request by userId and update its status to "accepted"
        const request = transfer.requests.find((r: any) => r.userId.toString() === userId.toString());
        if (request) {
            request.status = "accepted";
            transfer.updatedAt = new Date(); // Update timestamp
            await transfer.save();

            return NextResponse.json({ message: "Request accepted" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Request not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error updating request:", error);
        return NextResponse.json({ message: "Error updating request" }, { status: 500 });
    }
}
