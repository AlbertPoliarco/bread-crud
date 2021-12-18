const express = require("express");
// const { splice } = require("../models/bread");
const breads = express.Router();
const Bread = require("../models/bread")
const seed = require("../models/seed")
// Index route
breads.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.render('index', {
                breads: foundBreads
                // title: 'Index Page'
        })
    })
})
// /breads/data/seed
breads.get('/data/seed', (req, res) => {
    Bread.insertMany([seed])
        .then(createdBreads => {
        res.redirect('/breads')
    })
})

// New route
breads.get("/new", (req, res) => {
    res.render("New");
})

// Create route
breads.post('/', (req, res) => {
    if(!req.body.image) {
        req.body.image = undefined 
    }
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
})


// Edit route
breads.get('/:id/edit', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render('edit', {
                bread: foundBread
        })
    })
})

// Show route
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err => {
            res.send('404')
        })
})

// UPDATE route
breads.put('/:id', (req, res) => {
    if(req.body.hasGluten === 'on'){
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
        .then(updatedBread => {
        console.log(updatedBread) 
        res.redirect(`/breads/${req.params.id}`) 
    })
})

// DELETE route
breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id) 
        .then(deletedBread => { 
        res.status(303).redirect('/breads')
    })
})
module.exports = breads; 