const mongoose=require('mongoose');

const ItemSchema=new mongoose.Schema({

  name:{
    type:String,
    required:true,
    minlength:1,
    unique:true
  },

  type:{
    type:String,
    required:true,
    minlength:1,
    unique:false
  },

  description:{
    type:String,
    required:false,
    minlength:1,
    unique:false
  }
});

const Item=mongoose.model('Item',ItemSchema);

module.exports={Item};
