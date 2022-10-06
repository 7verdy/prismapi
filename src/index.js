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

app.put('/api/armour', (req, res) => {
  const body = req.body;

  stats = addEquipment(body);
  return res.status(200).json({
    result: stats
  }).send();
});

app.get('/api/armour', (req, res) => {
  const body = req.body;

  stats = getEquipment(body);
  return res.status(200).json({
    result: stats
  }).send();
});

app.delete('/api/armour', (req, res) => {
  const body = req.body;

  stats = removeEquipment(body);
  return res.status(200).json({
    result: stats
  }).send();
});


app.listen(port, () => {
  console.log(`API started on port ${port}!`);
})