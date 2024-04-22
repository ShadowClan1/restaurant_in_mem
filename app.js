const express = require('express')
const app = express()
app.use(express.json())

app.use(require('cors')())



let restauratants =[
  { id : 1,
    name :"Deepak Restaurant",
    description : "This is the dynamic description",
    avg_rating :3.5 
},
  { id :2,
    name :"Rahul Restaurant",
    description : "This is the dynamic description",
    avg_rating :4 
},
  { id :3,
    name :"Rohit Restaurant",
    description : "This is the dynamic description",
    avg_rating :2 
},
  { id :4,
    name :"Nishant Restaurant",
    description : "This is the dynamic description",
    avg_rating :5 
}
]

app.post('/add-restaurant',(req,res)=>{
    let {name, description, image, avg_rating} = req.body;

    restauratants.push({name, avg_rating , description, image, id :restauratants.length+1 })
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
    curRes.avg_rating = rating
  return res.status(200).json({data : [...restauratants], success :true})
})
app.post('/update-restaurant',(req,res)=>{
    let {id, avg_rating, name, description} = req.body;
  let curRes =   restauratants.find((e)=>e.id === id)
  if(!curRes){
    return res.status(400).json({error : "Restaurant not found with this id", success :false})
  }
    curRes.avg_rating = avg_rating
    curRes.name = name
    curRes.description = description
  return res.status(200).json({data : [...restauratants], success :true})
})

app.listen(5000, ()=>{
    console.log("Server is listening on port 5000")
})