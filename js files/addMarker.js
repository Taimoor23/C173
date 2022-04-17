AFRAME.registerComponent("create-markers",{
    init: async function(){
        var mainScene=document.querySelector("#main-scene")
        var dishes= await this.getDishes()
        dishes.map(dish=>{
            var marker=document.createElement("a-marker")
            marker.setAttribute("id",dish.id)
            marker.setAttribute("type","pattern")
            marker.setAttribute("url",dish.marker.url)
            marker.setAttribute("cursor",{
                rayOrigin:"mouse"
            })
            marker.setAttribute("markerHandler",{})
            mainScene.appendChild(marker)

            var todaysDate=new Date()
            var todaysDay=todaysDate.getDay()
    
            var days=[
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "firday",
                "saturday"
            ]
            if(!dish.unavailable_days.includes(days[todaysDate])){
        
        var model=document.createElement("a-entity")
        model.setAttribute("id",`model-${dish.id}`)
        model.setAttribute("position",dish.model_geometry.position)
        model.setAttribute("rotation",dish.model_geometry.rotation)
        model.setAttribute("scale",dish.model_geometry.scale)
        model.setAttribute("gltf-model",`url(${dish.model_url})`)
        model.setAttribute("gestureHandler",{})
        model.setAttribute("visible",false)
        marker.appendChild(model)

        var mainPlane=document.createElement("a-plane")
        mainPlane.setAttribute("id",`main-plane-${dish.id}`)
        mainPlane.setAttribute("position",{x:0,y:0,z:0})
        mainPlane.setAttribute("rotation",{x:-90,y:0,z:0})
        mainPlane.setAttribute("width",1.7)
        mainPlane.setAttribute("height",1.5)
        mainPlane.setAttribute("visible",false)
        marker.appendChild(mainPlane)

        var titlePlane=document.createElement("a-plane")
        titlePlane.setAttribute("id",`title-plane-${dish.id}`)
        titlePlane.setAttribute("position",{x:0,y:0.89,z:0.02})
        titlePlane.setAttribute("rotation",{x:0,y:0,z:0})
        titlePlane.setAttribute("width",1.69)
        titlePlane.setAttribute("height",3)
        marker.appendChild(titlePlane)

        var dishTitle=document.createElement("a-entity")
        dishTitle.setAttribute("id",`dish-title-${dish.id}`)
        dishTitle.setAttribute("position",{x:0,y:0,z:0.1})
        dishTitle.setAttribute("rotation",{x:0,y:0,z:0})
        dishTitle.setAttribute("text",{
            font:"monoid",
            color:"black",
            width:1.8,
            height:1,
            align:"center",
            value: dish.dish_name.toUpperCase()
        })
        titlePlane.appendChild(dishTitle)

        var ingredients=document.createElement("a-entity")
        ingredients.setAttribute("id",`ingredients-${dish.id}`)
        ingredients.setAttribute("position",{x:0.3,y:0,z:0.1})
        ingredients.setAttribute("rotation",{x:0,y:0,z:0})
        ingredients.setAttribute("text",{
            font:"monoid",
            color:"black",
            width:2,
            height:1,
            align:"left",
            value: `${dish.ingredients.join("\n\n")}`
        })
        mainPlane.appendChild(ingredients)

        var pricePlane=document.createElement("a-image")
        pricePlane.setAttribute("id",`price-plane${dish.id}`)
        pricePlane.setAttribute("src",'https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png')
        pricePlane.setAttribute("width",0.8)
        pricePlane.setAttribute("height",0.8)
        pricePlane.setAttribute("position",{x:-1.3,y:0,z:0.3})
        pricePlane.setAttribute("rotation",{x:-90,y:0,z:0})
        pricePlane.setAttribute("visible",false)
        
        var price=document.createElement("a-entity")
        price.setAttribute("id",`price-${dish.id}`)
        price.setAttribute("position",{x:0.03,y:0.05,z:0.1})
        price.setAttribute("rotation",{x:0.,y:0,z:0})
        price.setAttribute("text",{
            font:"mozillavr",
            color:"white",
            width:"3",
            align:"center",
            value:`only\$${dish.price}`
        })
        pricePlane.append(price)
        marker.appendChild(pricePlane)
    }
    })
    },
    
    getDishes: async function(){
        return await firebase
        .firestore()
        .collection("dishes")
        .get()
        .then(snap=>{
            return snap.docs.map(doc=>doc.data())
        })
    }
})