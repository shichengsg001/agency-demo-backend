var express = require('express');
var router = express.Router();

const url = (process.env.DB_HOST || 'localhost:27017') + '/agencyDemoDB';
const db = require('monk')(url);

const collection = db.get('grants');

router.get('/', function(req, res) {
  res.render('admin', { title: 'User Route' });
});

router.get('/list/:user', function(req, res){

  var user = req.params.user;

  return collection.find({creator: user}).then(function(docs){

    return res.json(docs);
  }).catch(function(err){
    return res.status(500).json(err);
  });
});

router.post('/create', function(req, res){
  var body = req.body;
  console.log(body);
  console.log(req);

  return collection.insert(body).then(function(){
    return res.sendStatus(200);
  }).catch(function(err){
    return res.status(500).json(err);
  });
});

router.delete('/grants/:id', function(req, res){
  var id = req.params.id;
  return collection.findOneAndDelete({_id: id}).then(function(){
    return res.sendStatus(200);
  }).catch(function(err){
    return res.status(500).json(err);
  })
});

router.get('/status', function(req,res){
  res.status(200).send('OK!');
})

module.exports = router;
