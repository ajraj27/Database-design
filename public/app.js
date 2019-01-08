
const allRestaurantsBtn=document.querySelector(".allRestaurants");
const searchRestaurantBtn=document.querySelector(".searchRestaurant");
const resList=document.querySelector(".resInfo");
const input =document.querySelector("#name");
const allList=document.querySelector(".allRes");
//let reviewBtn=document.querySelector('.reviewRest');
//const allReviewsBtn=document.querySelector('.reviewAllRest');

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
           const inputReviewHtml=`<label for="review">Review: </label><input type="text" id="review" size="60" placeholder="Write Something..."/><Button style="margin-left:20px" type="submit" onclick="showReviews('${res.name}')">Submit</Button>`;
           //const showAllReviews='<BR><BR><Button class="reviewAllRest">Show all Reviews</Button>';
           let reviewHeadHtml='<BR><BR><h3>Reviews: </h3><ul class="reviewList"></ul>';
           let newhtml=html+`<ul>${dishes}</ul><BR><BR>`+inputReviewHtml+reviewHeadHtml;
           resList.innerHTML=newhtml;
            showReviews(res.name);
         }

      });
    } catch (err) {
        console.log(err);
    }
  }

});

const showReviews=(resName) => {
  const inputReview=document.querySelector('#review');

  inputReview.focus();
  const review=inputReview.value.trim(' ');

  if(review){
      fetchReviews(review,resName);
      inputReview.value='';
  }

  else{
    fetchReviews(null,resName);
  }
}

const fetchReviews=(review,resName) => {
  const reviewList=document.querySelector('.reviewList');
  const ctr=reviewList.childNodes.length+1;


  try{
      fetch('/allReviews',{
        method:"POST",
        body:JSON.stringify({resName,review,ctr}),
        headers:{"Content-Type":"application/json; charset=utf-8"}
      }).then((doc) => doc.json()).then((doc) => {
          const allReviews=doc.map((item,index) => `<li id=${item.custom_id}> ${item.review}   <Button class="upvoteInc" style="margin-left:250px" onclick="voteManagement(this,'${resName}','upvote')"> Upvote </Button>${item.upvote} <Button class="downvoteInc" onclick="voteManagement(this,'${resName}','downvote')"> Downvote </Button>${item.downvote} </li>`).join('');
          reviewList.innerHTML=allReviews;
          //voteManagement(resName);
      })
  }catch(err){
    console.log(err);
  }

}


const voteManagement=(btn,resName,type) => {
      const id =btn.parentNode.getAttribute("id");
      updateVotes(id,resName,type);
}

const updateVotes=(id,resName,type) => {
  try {
    fetch(`/updateVotes/:${id}`,{
      method:'PUT',
      body:JSON.stringify({type}),
      headers:{"Content-Type":"application/json; charset=utf-8"}
    }).then((res) =>{
      if(res.ok){
        fetchReviews(null,resName);
      }
    } )
  } catch (e) {
      console.log(e);
  }

}
