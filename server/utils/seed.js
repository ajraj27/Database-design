const {Restaurant}=require("../models/Restaurant");
const {Item}=require("../models/Item");

const restaurants=[{
  name:"indian summer cafe",
  address:"Subhas Chauraha,Golambar,Patna",
  rating:3.8,
  dishes:[{
    name:"Chicken Butter Masala",
    price:270
  },{
    name:"Panneer Chilli",
    price:190
  }]
},{
  name:"pind baluchi",
  address:"Opposite Buddha Stupa,Ashiyana Road,Patna",
  rating:4.2,
  dishes:[{
    name:"Chicken Handi",
    price:280
  },{
    name:"Mushroom Korma",
    price:150
  }]
},{
  name:"barcode",
  address:"AT Tower,Moryalok,Patna",
  rating:4,
  dishes:[{
    name:"Chicken Chilli",
    price:265
  },{
    name:"Panneer Korma",
    price:200
  }]
}]

const items=[{
  name:"Chicken Butter Masala",
  type:"Non-veg",
  description:"The spices may include garam masala, ginger, garlic, pepper, coriander, cumin, turmeric and chili. The chicken is usually cooked in a tandoor (traditional clay oven), but may be grilled, roasted, or pan fried. It is served in a mild curry sauce that includes butter."
},{
  name:"Panneer Chilli",
  type:"Veg",
  description:"This paneer chilli recipe is a Indo Chinese style stir fry of deep fried cottage cheese cubes with bell peppers, chillies, onion, garlic."
},{
  name:"Chicken Handi",
  type:"Non-veg",
  description:"Chicken Handi Recipe-A very traditional restaurant style chicken handi recipe that is made in a special vessel called a handi in Telugu."
},{
  name:"Mushroom Korma",
  type:"Veg",
  description:"Mushroom Korma is cooked in a cashew-coconut base and is vegan and gluten-free. ... Korma is normally a mildly spiced Indian curry dish of meat or fish marinated in yogurt."
},{
  name:"Chicken Chilli",
  type:"Non-veg",
  description:"Chilli chicken is a popular Indo-Chinese dish of chicken. In India, this may include a variety of dry chicken preparations. Though mainly boneless chicken is used in this dish, some people also recommend to use boned chicken too."
},{
  name:"Panneer Korma",
  type:"Veg",
  description:"Shahi Paneer Korma is an exquisite main dish recipe, which has a thick gravy made of almonds, low fat cream and yoghurt along with a melange of whole and ground spices. "
}]

Restaurant.remove({}).then(() => {
  return Restaurant.insertMany(restaurants);
}).then((docs) => console.log("Successfully inserted"));

Item.remove({}).then(() => {
  return Item.insertMany(items);
}).then((docs) => console.log("Successfully inserted"));
