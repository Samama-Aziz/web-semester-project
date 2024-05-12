const mongose = require("mongoose");


const db = process.env.DataB;
mongose.connect(db , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("connection Done!");
}).catch((err)=>{
    console.log(err);
})