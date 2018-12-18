
const allRestaurantsBtn=document.querySelector(".allRestaurants");
const searchRestaurantBtn=document.querySelector(".searchRestaurant");
const resList=document.querySelector(".resInfo");
const input =document.querySelector("#name");
const allList=document.querySelector(".allRes");

allRestaurantsBtn.addEventListener("click",(e) => {
  e.preventDefault();

  try {
    fetch('/allRestaurants').then((doc) => doc.json()).then((doc) => {
      const allResinfo=doc.map((res) => `<li>${res.name.toUpperCase()}   (${res.rating})</li>`).join('');
      allList.innerHTML=allResinfo;
    });
  } catch (err) {
    console.log(err);
  }

});

searchRestaurantBtn.addEventListener("click",(e) => {
  e.preventDefault();
  const name=input.value;
  var res;

  if(name){
    //console.log(name);
    try {
      fetch('/searchRestaurant',{
        method:'POST',
        body:JSON.stringify({name}),
        headers:{"Content-Type":"application/json; charset=utf-8"}
      }).then((doc) => {
          if(doc.status==200){
            return doc.json();
          }
          else{
            throw new Error("This restaurant doesnt exist.");
          }
      }).then((doc) => {
         res=doc;

         if(res){
           const html=`<li><h2>${res.name.toUpperCase()}</h2></li><li><B>Address</B>: ${res.address}</li><li><B>Rating</B>: ${res.rating}</li>`;
           const dishes=res.dishes.map((dish) => `<li>${dish.name} (Rs.${dish.price})</li>`).join('');
           const newhtml=html+`<ul>${dishes}</ul>`;
           resList.innerHTML=newhtml;
         }

      });
    } catch (err) {
        console.log(err);
    }
  }

});
