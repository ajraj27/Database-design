
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
     const insertedDoc=await Reviews.insert({resName:req.body.resName,review:req.body.review,upvote:0,downvote:0});
  }
  const allReviewsBody=await Reviews.find({resName:req.body.resName}).toArray();
  // let allReviews=allReviewsBody.map(item => {
  //   review:item.review,
  //   upvote:item.upvote,
  //   downvote:item.downvote});
  let allReviews=allReviewsBody.map((item) => ({review:item.review,upvote:item.upvote,downvote:item.downvote}));
  allReviews=allReviews.sort((a,b) => b.upvote-a.upvote);

  res.send(allReviews);
});

app.put('/updateVotes',async (req,res) => {
  const Reviews=req.db.collection("Reviews");

  const allRes=await Reviews.find({resName:req.body.resName}).toArray();
  const objectID=allRes[req.body.count]._id;

  Reviews.update(
    {_id:objectID},
    {$inc:{"upvote":1}}
  );
});

app.listen(port,() => {
  console.log(`Started app on port ${port}!!`);
})
