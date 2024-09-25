import Transfer from "@/lib/models/Transfer";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const data = await req.json();

        // Find the transfer document by ID
        const transfer = await Transfer.findById(data.transferId);
        if (!transfer) {
            return new NextResponse('Transfer not found', { status: 404 });
        }

        // Use $addToSet to add a request with userId and default status
        await Transfer.findByIdAndUpdate(
            data.transferId,
            { 
                $addToSet: { 
                    requests: { 
                        userId: data.userId, 
                        status: 'pending'  // Set default status as 'pending'
                    } 
                } 
            },
            { new: true } // Return the updated document if needed
        );

        return new NextResponse('Request added successfully', { status: 200 });
    } catch (error) {
        console.log('[Error while processing transfer update]', error);
        return new NextResponse('Error while processing transfer update', { status: 500 });
    }
}
