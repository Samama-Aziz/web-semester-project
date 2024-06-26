const mongose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userScheam = new mongose.Schema({
    Name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    },
    profilePic:{
        type: String, 
        default: ""
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

userScheam.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

userScheam.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}
const User = mongose.model('USER',userScheam);

module.exports = User;