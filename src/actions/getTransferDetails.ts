import Transfer from "@/lib/models/Transfer";
import { connectToDB } from "@/lib/mongoDB";

export async function getTransferDetails() {
    try {
        await connectToDB();

        // Find and populate userId in requests
        const transfers = await Transfer.find({})
            .populate('requests.userId', 'name email specialty class gender')  // Populate userId and only select name and email fields
            .sort({ createdAt: 'asc' });

        if (!transfers) {
            return null;
        }

        // Convert ObjectId to string
        const trs = transfers.map((tr: any) => ({
            _id: tr?._id.toString(),
            studentId: tr?.studentId.toString(),
            name: tr.name,
            email: tr.email,
            fromSpecialty: tr.fromSpecialty,
            fromClass: tr.fromClass,
            toSpecialty: tr.toSpecialty,
            toClass: tr.toClass,
            requests: tr.requests.map((request: any) => ({
                _id: request._id.toString(),
                userId: {
                    _id: request.userId._id.toString(),
                    name: request.userId.name,
                    email: request.userId.email,
                    gender: request.userId.gender,
                    class: request.userId.class,
                    specialty: request.userId.specialty
                },
                status: request.status
            })),
            createdAt: tr.createdAt,
            updatedAt: tr.updatedAt,
        }));

        return trs;

    } catch (error) {
        console.log('Error while getting transfer details:', error);
        return null;
    }
}
