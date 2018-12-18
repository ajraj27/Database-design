require('./utils/seed');
const {mongoose}=require("./db/mongoose");
const {Restaurant}=require("./models/Restaurant");
const {Item}=require("./models/Item");

const express=require("express");
const path=require('path');
const bodyParser=require('body-parser');

const app=express();
const port=3000;
const publicPath=path.join(__dirname,'../public');
app.use(bodyParser.json());

app.use(express.static(publicPath));

app.get('/allRestaurants',(req,res) => {
  console.log("hey");

  Restaurant.find({}).then((doc) => {
    const resNames=doc.map((restaurant) => {
      return {"name":restaurant.name,"rating":restaurant.rating};
    });

    res.send(resNames);
  });
});

app.post('/searchRestaurant',(req,res) => {
  let restaurant;

  Restaurant.findOne({name:req.body.name.toLowerCase()}).then((doc) => {
    if(!doc){
      return res.status(404).send();
    }

    res.send(doc);
  })
});

app.listen(port,() => {
  console.log(`Started app on port ${port}!!`);
})
