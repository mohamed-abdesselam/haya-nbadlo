import Transfer from "@/lib/models/Transfer";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { transferId: string } }) {
    try {
        await connectToDB();
        const transfer = await Transfer.findByIdAndDelete(params.transferId);
        if (!transfer) {
            return new NextResponse("Transfer not found", { status: 404 });
        }
        return new NextResponse("Request status deleted");
    } catch (error) {
        return new NextResponse("Error deleting request", { status: 500 });
    }
}
