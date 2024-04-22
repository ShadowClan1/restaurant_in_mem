const express = require('express')
const app = express()
app.use(express.json())

app.use(require('cors')())



let restauratants =[
  { id : 1,
    name :"Deepak Restaurant",
    description : "This is the dynamic description",
    rating :3324 ,
    total_ratings :720
},
  { id :2,
    name :"Rahul Restaurant",
    description : "This is the dynamic description",
    rating :2324 ,
    total_ratings :680
},
  { id :3,
    name :"Rohit Restaurant",
    description : "This is the dynamic description",
    rating :332 ,
    total_ratings :100
},
  { id :4,
    name :"Nishant Restaurant",
    description : "This is the dynamic description",
    rating :5 ,
    total_ratings :1
}
]

app.post('/add-restaurant',(req,res)=>{
    let {name, description, image, avg_rating} = req.body;

    restauratants.push({name, avg_rating , description, total_rating :0, rating :0, id :restauratants.length+1 })
    return res.status(200).json({data :[...restauratants], success :true})
})

app.get('/list', (req, res)=>{
    return res.status(200).json({data : [...restauratants], success : true})
})


app.post('/add-rating',(req,res)=>{
    let {id, rating} = req.body;
  let curRes =   restauratants.find((e)=>e.id === id)
  
  if(!curRes){
    return res.status(400).json({error : "Restaurant not found with this id", success :false})
  }
  if(rating > 5 ||rating <0 || Number.isNaN(rating)){
    return res.status(400).json({error : "Rating should be number between 0-5", success :false})
  }
    curRes.rating = rating
    curRes.total_ratings++;
  return res.status(200).json({data : [...restauratants], success :true})
})
app.post('/update-restaurant',(req,res)=>{
    let {id, rating, name, description} = req.body;
  let curRes =   restauratants.find((e)=>e.id === id)
  if(!curRes){
    return res.status(400).json({error : "Restaurant not found with this id", success :false})
  }
    curRes.name = name
    curRes.description = description
  return res.status(200).json({data : [...restauratants], success :true})
})

app.listen(5000, ()=>{
    console.log("Server is listening on port 5000")
})