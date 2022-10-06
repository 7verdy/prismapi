const express = require('express')
const app = express()
const port = 7070

const { getStatsFromRequest } = require('./utils')
const { addArmour, getArmour, removeArmour } = require('./armour')
const { calculateStats } = require('./stats')

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.get('/api/stats', (req, res) => {
  const body = req.body;

  stats = getStatsFromRequest(body);
  return res.status(200).json({
    result: stats
  }).send();
});

app.get('/api/stats/new', (req, res) => {
  const body = req.body;

  try {
    stats = calculateStats(body);
    return res.status(200).json({
      result: stats
    }).send();
  } catch (error) {
    return res.status(404).json({
      error: error.message
    }).send();
  }
});

app.put('/api/armour/:id', (req, res) => {
  const body = req.body;
  var id = req.params['id'].toUpperCase();

  stats = addArmour(id, body);
  return res.status(201).json({
    result: stats
  }).send();
});

app.get('/api/armour/:id/:level?', (req, res) => {
  var id = req.params['id'].toUpperCase();
  var level = req.params['level'];

  stats = getArmour(id, level);
  return res.status(200).json({
    result: stats
  }).send();
});

app.delete('/api/armour/:id', (req, res) => {
  const body = req.body;
  var id = req.params['id'].toUpperCase();

  stats = removeArmour(id);
  return res.status(200).json({
    result: stats
  }).send();
});


app.listen(port, () => {
  console.log(`API started on port ${port}!`);
})