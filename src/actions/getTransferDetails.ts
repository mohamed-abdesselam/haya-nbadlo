import Transfer from "@/lib/models/Transfer";
import { connectToDB } from "@/lib/mongoDB";

export async function getTransferDetails() {
    try {
        await connectToDB();

        // Find and populate userId in requests
        const transfers = await Transfer.find({})
            .populate('requests.userId', 'name email specialty class gender') // Populate userId within requests and select specific fields
            .populate('studentId', '_id name email specialty class gender')   // Populate studentId and select specific fields
            .sort({ createdAt: 'asc' }); // Sort results by createdAt field in ascending order


        if (!transfers) {
            return null;
        }

        // Convert ObjectId to string
        const trs = transfers.map((tr: any) => ({
            _id: tr?._id.toString(),
            studentId: {
                _id: tr.studentId._id.toString(),
                email: tr.studentId.email,
                name: tr.studentId.name,
                gender: tr.studentId.gender,
                specialty: tr.studentId.specialty,
                class: tr.studentId.class,
            },
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
