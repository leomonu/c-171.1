AFRAME.registerComponent("marker-handler", {
  init: async function () {

    //get the dishes collection from firestore database
    var dishes = await this.getDishes();

    //markerFound event
    this.el.addEventListener("markerFound", () => {
      var markerId = this.el.id;      
      this.handleMarkerFound(dishes, markerId);
    });

    //markerLost event
    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });

  },
  handleMarkerFound: function (dishes, markerId) {
    // Changing button div visibility
    // getting current days
    var todaydate=new Date()
    var todayday =  todaydate.getDay()
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
    console.log(todaydate)
    var dish =        dishes.filter(dish=>dish.id===markerId)[0]
    if(dish.unavailable_days.includes(days[todayday])){
      swal({
        icon:"warning",
        title:dish.dish_name.toUpperCase(),
        text:"This Dish is not available today",
        timer:2500,
        buttons:false
      })

    }
    else{

      // changing the model scale
      var model = document.querySelector(`#model-${dish.id}`)
      model.setAttribute("position",dish.model_geometry.position) 
      model.setAttribute("rotation",dish.model_geometry.rotation) 
      model.setAttribute("scale",dish.model_geometry.scale)
      model.setAttribute("visible",true)


      var ingredients=document.querySelector(`#main_plane-${dish.id}`)
      ingredients.setAttribute("visible",true)

      var priceplane = document.querySelector(`#priceplane-${dish.id}`)
      priceplane.setAttribute("visible",true)

      // changing the button visibility
    } 
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    var ratingButton = document.getElementById("rating-button");
    var orderButtton = document.getElementById("order-button");

    // Handling Click Events
    ratingButton.addEventListener("click", function () {
      swal({
        icon: "warning",
        title: "Rate Dish",
        text: "Work In Progress"
      });
    });

    orderButtton.addEventListener("click", () => {
      swal({
        icon: "https://i.imgur.com/4NZ6uLY.jpg",
        title: "Thanks For Order !",
        text: "Your order will serve soon on your table!"
      });
    });

    // Changing Model scale to initial scale
    var dish = dishes.filter(dish => dish.id === markerId)[0];

    var model = document.querySelector(`#model-${dish.id}`);
    model.setAttribute("position", dish.model_geometry.position);
    model.setAttribute("rotation", dish.model_geometry.rotation);
    model.setAttribute("scale", dish.model_geometry.scale);
  },

  handleMarkerLost: function () {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  },
  //get the dishes collection from firestore database
  getDishes: async function () {
    return await firebase
      .firestore()
      .collection("dishes")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
});
