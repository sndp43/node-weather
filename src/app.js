const path = require("path")
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utills/geocode')
const forcast = require('./utills/forecast')

const app = express()

//define paths for express engine
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set handlebars template engine and views location
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//tell express about publicDirectorypathcls
app.use(express.static(publicDirectoryPath))


//ROUTES
app.get("",(req,res)=>{
   res.render("index",{
       title:"Weather",
       name:"Sandeep Modak"
   })
})

app.get("/help",(req,res)=>{
 res.render("help",{
     title:"Help",
     name:"Sandeep Modak"
 })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Sandeep Modak"
    })
})

app.get("/weather",(req,res)=>{
    //address validation
   if(!req.query.address){
      return res.send({
           error:"Please give address"
       })
   }

   //call geocode
   let address = req.query.address

   geocode(address,(error,{lat,lon,location}={})=>{  //destruction on response "{lat,lon,location}"
            if(error){
                return res.send({ error })
            }

            forcast(lat,lon,(error,forcastData)=>{
                if(error){
                    return res.send({error})
                }
                     return res.send({
                        forecast:forcastData,
                        location,
                        address
                     })  
            })

   })

}) 


app.get("/products",(req,res)=>{
  
        if(!req.query.search){
            return res.send({
                error:"you must provide search term"
            })
        }

        res.send({
            products:[]
        })
    
})

app.get("/help/*",(req,res)=>{
res.render('404',{
            errorMessage:"Help article not found"
        })
})

app.get("*",(req,res)=>{
    res.render('404',{
             errorMessage:"404 Page Not Found"
        })
    
})


app.listen(3000,()=>{
    console.log("server startted") 
})