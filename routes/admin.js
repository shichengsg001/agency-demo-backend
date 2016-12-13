var express = require('express');
var router = express.Router();

const username = process.env.DATABASE_USERNAME || 'agencyDemoUser';
const password = process.env.DATABASE_PASSWORD || 'iloveida';

const url = (process.env.DATABASE_HOST_PORT || 'mongodb-nectar.idahive.sg:27017') + '/agencyDemoDB';
const db = require('monk')(username + ':' + password +'@'+ url);

const collection = db.get('grants');

router.get('/', function(req, res) {
  res.render('admin', { title: 'Admin Route' });
});

router.get('/ulist', function(req, res){
  return collection.find({approval: null}).then(function(docs){
    return res.json(docs);
  }).catch(function(err){
    return res.status(500).json(err);
  });
});

router.get('/alist', function(req, res){
  return collection.find({approval: true}).then(function(docs){
    return res.json(docs);
  }).catch(function(err){
    return res.status(500).json(err);
  });
});

router.get('/grants/:id', function(req, res){
  var id = req.params.id;

  return collection.find({_id: id}).then(function(doc){
    return res.json(doc);
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

router.put('/grants/:id', function(req, res) {
  var id = req.params.id;
  var body = req.body;
  console.log('body');

  if (!body) return;

  return collection.findOneAndUpdate({_id: id}, {$set: body}).then(function(){
    return res.sendStatus(200);
  }).catch(function(err){
    return res.status(500).json(err);
  });
});

module.exports = router;
