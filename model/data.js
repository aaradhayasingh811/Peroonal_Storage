const mongoose = require('mongoose');


const dataSchema = mongoose.Schema({
    title :{
        type:String,
        required :true,
    }
    ,
    username :{
        type :String,
        required:true,
    }
    ,
    image : {
        type: String,
    },
    message : {
        type: String,
        required :true,
    }
});

module.exports = mongoose.model('data',dataSchema);
