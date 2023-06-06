import mongoose, { Document } from "mongoose";
import { IProfile } from "./profile.interface";

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user";
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    Status: {
        type: String,
        required: true
    },
    skill: {
        type: [String],  
        required : true 
    },
    bio: {
        type: String,
    },
    experience [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
            },
            from: {
                type:Date,
                required: true
            },
            to:{
                type:Date
            },
            current: {
                type: boolean,
                default: false,
            },
            description: {
                type: String,
            } 
        },
    ],
    education [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type:Date,
                required: true
            },
            to:{
                type:Date
            },
            current: {
                type: boolean,
                default: false,
            },
            description: {
                type: String,
            } 
        },
    ],
    social: {
        youtube: {
            type: string;
        },
        twitter: {
            type: string;
        },
        facebook: {
            type: string;
        },
        instagram: {
            type: string;
        },
        linkedin: {
            type: string;
        },
    },
    date: {
        type: Date,
        default: Date.now
    } 
});

export default mongoose.model<IProfile & Document>('profile',ProfileSchema);