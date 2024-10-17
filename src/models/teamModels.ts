import mongoose from 'mongoose';
const teamSchema=new mongoose.Schema({
    teamName:{
        type:String,
        required:[true,'Please Provide the Team Name']
    },
    teamLeaderName:{
        type:String,
        required:[true,'Please Provide the Team Leader Name']
    },
    teamSize:{
        type:Number,
        required:[true,'Please Provide the Team Size']
    },
    teamMembers:{
        type:Array,
    },
    contactNo:{
        type:Number
    },
    email:{
        type:String,
        required:[true,'Please Provide the Email']
    },
    domains:{
        type:Array,
        required:[true,'Please Provide the Domains of the Project']
    },
    projectTitle:{
        type:String
    },
    uploadedfile:{
        type:String,
        required:[true,'Plaese provide the File Link']
    },
    encryptedString:{
        type:String
    },
    encryptedStringExpiry:{
        type:Date
    }
})

const teamModel=mongoose.models.teams || mongoose.model('teams',teamSchema);
export default teamModel;