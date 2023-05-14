// import express from "express";
const express = require("express");
// import cors from "cors";
const cors = require("cors");
// import mongoose from "mongoose";
const mongoose = require("mongoose");
const accountSid ="AC5052563d4805d00c4cb544146d26e6c7";
const authToken = "fbbabfa5e3b8589cfd5f63f300282369";
const client = require('twilio')(accountSid, authToken);

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());



mongoose.connect("mongodb://localhost:27017/local",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});()=>{
    console.log("connected to DB")
}


//user schema 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobileno: String,
    password: String
})

const detailSchema = mongoose.Schema({

     fullname:String,
     mothername:String,
     dob:Date,
     address:String,
     profession:String,
     income:Number,
     cast:String,
     aadharno:String,
     qualification:String,
     mobileno:String,
     gender:String
})

const AdminSchema = mongoose.Schema({

    mobileno:String,
    email:String,
    name:String,
    password:String
})

const SchemedetailSchema = mongoose.Schema({

    title:String,
    description:String,
    deadline:String,
    reqdocs:String,
    age:Number,
    profession:String,
    income:Number,
    cast:String,
    qualification:String,
    catagory:String,
    gender:String,
    link:String
})




const Details = new mongoose.model("Details",detailSchema)
const User = new mongoose.model("User", userSchema)
const Admin = new mongoose.model("Admin",AdminSchema)
const SchemeDetails = new mongoose.model("SchemeDetails",SchemedetailSchema)

//routes routes
app.put('/Form', (req, res) => {
    const {fullname,mothername,dob,address,profession,income,cast,aadharno,qualification,gender,mobileno}=req.body;
    Details.findOneAndUpdate({mobileno:mobileno},req.body).then(function(details){
        Details.findOne({mobileno:mobileno}).then(function(details){
            res.send({message:"Details Submited successfully",details});
        });
       
    });
   
  });
 let usermono;
app.post("/Login",(req,res)=>{
    const {mobileno,password} =req.body;
    User.findOne({mobileno:mobileno},(err,user)=>{
        if(user){
           if(password === user.password){
            
            usermono=user.mobileno;
               res.send({message:"login sucess",user:user})
               
               

           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        }
    })
});

 
app.get("/Profile",(req,res)=>{
   Details.findOne({mobileno:usermono},(err,details)=>{
    if(details)
    {
        res.send(details)
    }
   })
});
app.post("/Register",(req,res)=>{
    console.log(req.body) 
    const {name,email,mobileno,password} =req.body;
    User.findOne({mobileno:mobileno},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({name,email,mobileno,password})
            const details=new Details({mobileno})
            details.save()
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"sucessfull"})
                }
            })
        }
    })


})

app.post("/AdminLogin",(req,res)=>{
    const {mobileno,password} =req.body;
    Admin.findOne({mobileno:mobileno},(err,admin)=>{
        if(admin){
           if(password === admin.password){
               res.send({message:"login sucess",admin:admin})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        }
    })
});

var mobilenos = [];
app.post("/uploadscheme",(req,res)=>{
    SchemeDetails.create(req.body).then(function(schemedetails){
        res.send({message:"Scheme uploaded successfully",schemedetails})
       
         var name=schemedetails.title;
            Details.find({profession:schemedetails.profession}).
            find({income:schemedetails.income}).
            find({cast:schemedetails.cast}).
            find({qualification:schemedetails.qualification}).
            find({gender:schemedetails.gender}).then(data => {
                    console.log(data);
                    data.map((d, k) => {
                        mobilenos.push(d.mobileno);
                    })
                    for(let i=0;i<mobilenos.length;i++){
                           
                        client.messages
                        .create({
                           body: 'You are eligible for '+ name  + ' scheme',
                           from: '+1 640 333 8681',
                           to: mobilenos[i]
                         })
                        .then(message => console.log(message.sid));
                       }
                });
                
                
    });
});



app.listen(6969,()=>{
    console.log("started")
})
module.exports={User}
