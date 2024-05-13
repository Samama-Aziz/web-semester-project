const mongeese = require('mongoose');

const userScheam = new mongeese.Schema({
    userid:{
        type: String,
        required:true
    },
    note:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    date:{
        type: String,
        required:true
    }
});
module.exports = mongeese.model('Income',userScheam);