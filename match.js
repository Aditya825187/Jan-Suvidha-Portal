const mongoose = require("mongoose");
const {User} = require('./index.js');

mongoose.connect("mongodb://localhost:27017/local",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});()=>{
    console.log("connected to DB")

}
var mobilenos = [];
user.find({gender:"female"}).then(data => {
    console.log(data);
    data.map((d, k) => {
        mobilenos.push(d.mobileno);
    })
    for (let i = 0; i < mobilenos.length; i++) {
        console.log(mobilenos[i]);
      }
});
