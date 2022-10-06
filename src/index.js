const express = require('express')
const app = express()
const port = 7070

const { getStatsFromRequest } = require('./utils')
const { addEquipment, getEquipment, removeEquipment } = require('./armour')

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.post('/api/stats', (req, res) => {
  const body = req.body;

  stats = getStatsFromRequest(body);
  return res.status(200).json({
    result: stats
  }).send();
});

app.put('/api/armour/:id', (req, res) => {
  const body = req.body;
  var id = req.params['id'];

  stats = addEquipment(id, body);
  return res.status(200).json({
    result: stats
  }).send();
});

app.get('/api/armour/:id/:level?', (req, res) => {
  const body = req.body;
  var id = req.params['id'];
  var level = req.params['level'];

  stats = getEquipment(id, level);
  return res.status(200).json({
    result: stats
  }).send();
});

app.delete('/api/armour/:id', (req, res) => {
  const body = req.body;
  var id = req.params['id'];

  stats = removeEquipment(id);
  return res.status(200).json({
    result: stats
  }).send();
});


app.listen(port, () => {
  console.log(`API started on port ${port}!`);
})