const mongoose=require('mongoose');

const RestaturantSchema=new mongoose.Schema({

  name:{
    type:String,
    required:true,
    minlength:1,
    unique:true
  },

  address:{
    type:String,
    required:true,
    minlength:1,
    unique:true
  },

  rating:{
    type:Number,
    required:false,
    minlength:1,
    unique:false
  },

  dishes:{
    type:Array,
    required:true,
    minlength:1,
    unique:false
  }

});

const Restaurant=mongoose.model('Restaurant',RestaturantSchema);

module.exports={Restaurant};
