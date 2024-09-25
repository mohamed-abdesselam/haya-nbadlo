import mongoose from "mongoose";

const InvitedAdminSchema = new mongoose.Schema({
    email: { type: "string", required: true },
    tokenExpiry: {
        type: Date,
        default: Date.now,
    },
    permissions: {
        AddProducts: { type: Boolean, default: false },
        ReplyToOrders: { type: Boolean, default: false },
        AddAdmins: { type: Boolean, default: false },
        CustomizeWebsite: { type: Boolean, default: false },
        SeeStatistics: { type: Boolean, default: false },
    },
})

const InvitedAdmin = mongoose.models.InvitedAdmin || mongoose.model('InvitedAdmin', InvitedAdminSchema);

export default InvitedAdmin;