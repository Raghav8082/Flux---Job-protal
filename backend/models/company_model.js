import mongoose from'mongoose';

const companyschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description: {
         type:String,
    },
    location:{
         type:String,
    },
    logo:{
        type:String, //url to logo image
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required : true 
    }

},{
    timestamps:true
})

companyschema.index({ name: 1, userId: 1 }, { unique: true });

export const Company = mongoose.model('Company',companyschema);
