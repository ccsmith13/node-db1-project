const express = require('express');
const db = require("../data/dbConfig.js");
const router = express.Router();

//Retrieve all accounts
router.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
      res.json(accounts);
    }) 
    .catch (err => {
      res.status(500).json({ message: 'Failed to get accounts' });
    });
  });

//Find account by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db('accounts').where({ id })
    .then(accounts => {
      if (accounts.length) {
        res.json(accounts);
      } else {
        res.status(404).json({ message: 'Could not find user with given id.' })
        }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get user' });
    })
  });

//Create new account 
router.post('/',(req,res)=>{
    const newAccount = req.body;
    db('accounts').insert( newAccount)
    .then (results => {
        if(results.length){
            res.status(201).json(results)
        }
    })
    .catch(err =>{
        res.status(500).json({ error: "There was an error while saving the new account to the database" })
    })
})

//Update account by ID 
router.put('/:id', (req,res)=>{
    const newInfo = req.body;
    const { id } = req.params;
    db('accounts').where({ id }).update(newInfo)
    .then(results => {
        if (results) {
          res.json(results);
        } else {
          res.status(404).json({ message: 'Could not find account with given id.' })
          }
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to update account' });
      })
})

//Delete account by ID
router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    db('accounts').where({ id }).del()
    .then(results => {
          res.json(results);
    })
      .catch (err => {
        res.status(500).json({ message: 'Failed to delete account' });
      })
})

  
module.exports = router;