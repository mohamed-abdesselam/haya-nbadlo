import mongoose from "mongoose";

const TransferSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: { type: String },
    name: { type: String },
    fromSpecialty: { type: String },
    fromClass: { type: String },
    toSpecialty: { type: String },
    toClass: { type: String },
    requests: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String , default: 'pending' },
    }],
}, { timestamps: true });

const Transfer = mongoose.models.Transfer || mongoose.model("Transfer", TransferSchema);

export default Transfer;
