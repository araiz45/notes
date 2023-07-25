const express = require("express");

const mongoose = require("mongoose");

const methodOverRide = require("method-override");

const app = express();

const port = 3000;

const model = require("./model/model");

app.set('view engine', 'ejs');

app.use(methodOverRide('_method'))

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'))

mongoose.connect('mongodb://127.0.0.1:27017/todo');

app.get("/", async (req, res) =>{
    const page = req.query.q || 0
    const booksPerPage = 5
    let count = await model.count({})

    let task = await model.find().skip(page*booksPerPage).limit(booksPerPage).sort({createdAt: 'desc'});

    res.render("home", {task: task, count: count});

})


app.post("/", async (req, res) =>{
    let createDate = new Date();
    
    let task = new model({work: req.body.task, createdAt: createDate});

    if(!(req.body.task === "")){
        try {
            await task.save();    

            res.redirect("/")

        }catch (err) {
           res.send("an error occur");

           console.log(err);
   
       }
    }
    else{
        res.redirect("/");

    }

})

app.delete("/:id", async (req, res) =>{
    await model.findByIdAndDelete(req.params.id);

    res.redirect("/")

})

app.get("/edit/:id", async (req, res) =>{
    let task = await model.findById(req.params.id);
    res.render("edit", {editWork: task.work, id: req.params.id})
})

app.put("/edit/:id", async (req, res) =>{
    let id = String(req.params.id);
    let task = req.body.task
    await model.findByIdAndUpdate(id, {work: task}).then(
        function(value){
            // console.log(value);
        }
    ).catch(
        function(err) {
            console.log(err);
        }
    )
    res.redirect("/");
})

app.listen(port, () =>{
    console.log(`Server has been started at http://localhost:${port}`)

});