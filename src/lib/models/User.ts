import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    gender: { type: String, default: 'men' },
    specialty: { type: String },
    class: { type: String },
    exchangeRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transfer' }],
    superAdmin: { type: Boolean, default: false },
    permissions: {
        AddProducts: { type: Boolean, default: false },
        ReplyToOrders: { type: Boolean, default: false },
        AddUsers: { type: Boolean, default: false },
        CustomizeWebsite: { type: Boolean, default: false },
        SeeStatistics: { type: Boolean, default: false },
    },
    resetPasswordToken: {
        type: String,
        required: false,
    },
    resetPasswordTokenExpiry: {
        type: Date,
        required: false,
    },
    emailVerified: {
        type: Boolean,
        default: false,
        required: false,
    },
    emailVerificationToken: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
