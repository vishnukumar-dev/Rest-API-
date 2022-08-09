const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

//Getting all
router.get('/',async (req,res)=>{
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }catch(err){
        res.status(500).json({message : err.message})
    }
})
//Getting one
router.get('/:id',getSubscriber,(req,res)=>{
    res.send(req.params.name)
})
//Creating one
router.post("/",async (req,res)=>{
    const subscriber = new Subscriber({
        name : req.body.name,
        subscriberToChannel : req.body.subscriberToChannel
    })

    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }catch(err){
        req.status(400).json({message : err.message})
    }
})
//Deleting one
router.delete("/:id",(req,res)=>{

})
// Updating one
router.patch("/:id",(req,res)=>{

})


async function getSubscriber(req,res,next){
    let subscriber

    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.subscriber = subscriber
}


module.exports = router; 