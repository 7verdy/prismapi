const express = require('express')
const app = express()
const port = 7070

const { getStatsFromRequest } = require('./utils')
const { addEquipment, getEquipment, removeEquipment } = require('./equipment')
const { calculateStats } = require('./stats')

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.route("/:path?")
  .get((req, res) => {
    var path = req.params['path'] ?? "index";
    var localPath = path;
    if (!path.includes("."))
      localPath = `${path}.html`;
    try {
      res.sendFile(__dirname + `/html/${localPath}`);
    } catch (err) {
      return res.status(404).json({
        error: err.message
      }).send();
    }
  })
  .post((req, res) => {
    // Catching a post request made from submitting a form
    // from the 'front' page.
    return res.status(202).json({
      success: true
    }).send();
  });

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
  } catch (err) {
    return res.status(404).json({
      error: err.message
    }).send();
  }
});

app.route('/api/:category/:id/:level?')
  .put((req, res) => {
    const body = req.body;
    var category = req.params['category'].toLowerCase();
    var id = req.params['id'].toUpperCase();

    stats = addEquipment(category, id, body);
    return res.status(201).json({
      result: stats
    }).send();
  })

  .get((req, res) => {
    var category = req.params['category'].toLowerCase();
    var id = req.params['id'].toUpperCase();
    var level = req.params['level'] ?? 1;

    try {
      stats = getEquipment(category, id)['stats'][level - 1];
      return res.status(200).json({
        result: stats
      }).send();
    } catch (err) {
      return res.status(404).json({
        error: err.message
      }).send();
    }
  })

  .delete((req, res) => {
    const body = req.body;
    var category = req.params['category'].toLowerCase();
    var id = req.params['id'].toUpperCase();

    stats = removeEquipment(category, id);
    return res.status(200).json({
      result: stats
    }).send();
  });


app.listen(port, () => {
  console.log(`API started on port ${port}!`);
})