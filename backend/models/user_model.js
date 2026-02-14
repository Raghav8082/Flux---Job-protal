import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    fullname : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required : true,
        unique : true   
    },

    phoneNumber:{
        type:Number,
        required:true,
    },
    password : {
        type:String,
        required:true
    }, 
    role:{
        type:String,
        enum:['Student','Recruiter','student','recruiter'],
        required:true
    },
profile: {
  bio: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  resume: {
    type: String, // Cloudinary URL
    default: "",
  },
  resumeOriginalName: {
    type: String,
    default: "",
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null,
  },
  profilePhoto: {
    type: String,
    default: "",
  },
},

},{
    timestamps:true
})

export const user = mongoose.model("user",userschema)
