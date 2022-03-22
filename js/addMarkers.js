AFRAME.registerComponent("create-markers", {
  init: async function () {
    var dishes = await this.getmydishes();
    // console.log(dishes);

    var scene=document.querySelector("#main-scene")
    // fetching all  informaiton from firebase (dishes)
    dishes.map(dish=>{
      // console.log(dish)
      var marker = document.createElement("a-marker")
      marker.setAttribute("id",dish.id)
      marker.setAttribute("type","pattern")
      marker.setAttribute("url",dish.marker_pattern_url)
      marker.setAttribute("cursor",{
        rayOrigin:"mouse"
      })
      marker.setAttribute("marker-handler",{})
      scene.appendChild(marker)
      // console.log(marker)
      // adding id model
      var model=document.createElement("a-entity")
      model.setAttribute("id",`model-${dish.id}`)
      model.setAttribute("position",dish.model_geometry.position) 
      model.setAttribute("rotation",dish.model_geometry.rotation) 
      model.setAttribute("scale",dish.model_geometry.scale)

      model.setAttribute("gltf-model",`url(${dish.model_url})`)
      model.setAttribute("gesture-handler",{})
      model.setAttribute("visible",false)
      marker.appendChild(model)
      console.log(model)

      // ingredients containing
      var mainplane = document.createElement("a-plane")
      mainplane.setAttribute("position",{x:0,y:0,z:0})
      mainplane.setAttribute("width",1.7) 
      mainplane.setAttribute("height",1.5)
      mainplane.setAttribute("rotation",{x:-90,y:0,z:0})
      mainplane.setAttribute("id",`main_plane-${dish.id}`)
      mainplane.setAttribute("visible",false)
      console.log(mainplane)
      marker.appendChild(mainplane)

      // creating dish title plane
      var titleplane= document.createElement("a-plane")
      titleplane.setAttribute("position",{x:0,y:0.9,z:0.02})
      titleplane.setAttribute("width",1.7) 
      titleplane.setAttribute("height",0.3)
      titleplane.setAttribute("rotation",{x:0,y:0,z:0})
      titleplane.setAttribute("material",{color:"orange"})
      titleplane.setAttribute("id",`main_plane-${dish.id}`)
      // console.log(titleplane)
      mainplane.appendChild(titleplane)
      // dish title
      var dishTitle=document.createElement("a-entity")
      dishTitle.setAttribute("position",{x:0,y:0,z:0.1})
      dishTitle.setAttribute("rotation",{x:0,y:0,z:0.1})
      dishTitle.setAttribute("text",{
        value:dish.dish_name.toUpperCase(),
        width:1.8,
        height:1,
        align:"center",
        font:"monoid",
        color:"black"

      })
      dishTitle.setAttribute("id",`dish_title-${dish.id}`)

      // console.log(dishTitle)
      titleplane.appendChild(dishTitle)
      // ingredienetsn
      var ingredients=document.createElement("a-entity")
      ingredients.setAttribute("position",{x:0,y:0,z:0.1})
      ingredients.setAttribute("rotation",{x:0,y:0,z:0})
      ingredients.setAttribute("text",{
        value:`${dish.ingredients.join("\n\n")}`,
        width:2,
        height:1,
        align:"center",
        font:"monoid",
        color:"black"

      })
      ingredients.setAttribute("id",`ingredients-${dish.id}`)
      mainplane.appendChild(ingredients)

      console.log(ingredients)

      // plane price
      var priceplane = document.createElement("a-entity")
      priceplane.setAttribute("id",`priceplane-${dish.id}`)
      priceplane.setAttribute("src","https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png")
      priceplane.setAttribute("width",0.6)
      priceplane.setAttribute("height",0.6)
      priceplane.setAttribute("rotation",{x:-90,y:0,z:0})
      priceplane.setAttribute("position",{x:-1.3,y:0,z:0})
      priceplane.setAttribute("visible",false)
      
      // price of dish
      var price = document.createElement("a-entity")
      price.setAttribute("id",`price-${dish.id}`)
      price.setAttribute("rotation",{x:0,y:0,z:0})
      price.setAttribute("position",{x:0.03,y:0.05,z:0.01})

      price.setAttribute("text",{
        value:`only\n $${dish.price}`,
        width:3,
        align:"center",
        font:"monoid",
        color:"black"

      })

      priceplane.appendChild(price)
      marker.appendChild(priceplane)

      // console.log(priceplane)
      
    })
  },
  getmydishes: async function () {
    // return await firebase.firestore().collection("dishes").get()
    // .then(snapshot=>{
    //   return snapshot.docs.map(doc=>{
    //     doc.data()
    //   })
    // })
    return await firebase
      .firestore()
      .collection("dishes")
      .get()
      .then((snap) => {
        return snap.docs.map((doc) => doc.data());
      });
  },
});
