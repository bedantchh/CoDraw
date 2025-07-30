import express from "express";

const app = express()
app.use(express())

app.post("/signin",(req,res)=>{
    res.json({
        "message": "signin"
    })
})

app.listen(3001)