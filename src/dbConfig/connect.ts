import mongoose from 'mongoose';
export default async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        let connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("MONGO DB Connected");
        });
        connection.on('error',(e)=>{
            console.log("DB Connection Failed ",e)
        })
    }
    catch(error){
        console.log(error);
    }
}

