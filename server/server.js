
require("./utils/seed");

const express=require("express");
const path=require('path');
const bodyParser=require('body-parser');
const expressMongoDb=require("express-mongo-db");

const app=express();
const port=3000;
const publicPath=path.join(__dirname,'../public');

app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(expressMongoDb("mongodb://localhost/Khanabot"));

app.get('/allRestaurants',(req,res) => {
  const Restaurant=req.db.collection('Restaurant');

  Restaurant.find().toArray().then((doc) => {
    const resNames=doc.map((restaurant) => {
      return {"name":restaurant.name,"rating":restaurant.rating};
    });

    res.send(resNames);
  });
});

app.post('/searchRestaurant',(req,res) => {
  const Restaurant=req.db.collection("Restaurant");
  let restaurant;

  Restaurant.findOne({name:req.body.name.toLowerCase()}).then((doc) => {
    if(!doc){
      return res.status(404).send();
    }

    res.send(doc);
  })
});

app.post('/allReviews',async (req,res) => {
  const Reviews=req.db.collection("Reviews");

  if(req.body.review){
     const insertedDoc=await Reviews.insert({resName:req.body.resName,review:req.body.review});
  }
  const allReviewsBody=await Reviews.find({resName:req.body.resName}).toArray();
  const allReviews=allReviewsBody.map((review) => review.review);
  res.send(allReviews);
});

app.listen(port,() => {
  console.log(`Started app on port ${port}!!`);
})
