import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    logo: {
        type: String,
    },
    upBar: {
        type: String,
    },
    arabicFont: {
        type: String,
    },
    latinFont: {
        type: String,
    },
    googleSheet: {
        type: String,
    },
    defaultLang: {
        type: String,
        default: 'en',
    },
    categotyForm: {
        type: String,
        default: 'rectangular',
    },
    buyForm: {
        type: String,
        default: 'direct',
    },
    useCart: {
        type: Boolean,
        default: true,
    },
    commente: {
        type: Boolean,
        default: false,
    },
    themeColor: {
        type: String,
        default: 'blue',
    },
    banner: [{
        image: {
            type: String,
        },
        link: {
            type: String,
        }
    }],
    // You can add other fields here as needed
}, { timestamps: true });

const Setting = mongoose.models.Setting || mongoose.model("Setting", settingsSchema);

export default Setting;
