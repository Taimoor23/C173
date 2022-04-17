AFRAME.registerComponent("create-buttons",{
    init:function(){
        var button1=document.createElement("button")
        button1.innerHTML="RATE US"
        button1.setAttribute("id","rating-button")
        button1.setAttribute("class","btn btn-warning")

        var button2=document.createElement("button")
        button2.innerHTML="ORDER NOW!"
        button2.setAttribute("id","order-button")
        button2.setAttribute("class","btn btn-warning")

        var button3=document.createElement("button")
        button3.innerHTML="ORDER SUMMARY!"
        button3.setAttribute("id","order-summary-button")
        button3.setAttribute("class","btn btn-warning ml-3")
        
        var buttonDiv=document.getElementById("button-div")
        buttonDiv.appendChild(button1)
        buttonDiv.appendChild(button2)

        
    }
})