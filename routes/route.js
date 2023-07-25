const express = require("express");

const router = express.Router();

const model = require("../model/model");

router.post("/", async (req, res) =>{
    console.log(req.body);

    let createDate = new Date();
    
    let task = new model({work: req.body.task, createdAt: createDate});

    try {
        await task.save();    

        res.redirect("/");

    } catch (err) {
        res.send("an error occur");

        console.log(err);

    }

})
