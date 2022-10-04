const express = require('express')
const app = express()
const port = 5000

const { getStatsFromRequest } = require('./utils')

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

app.post('/api/stats', (req, res) => {
    const body = req.body;
  
    stats = getStatsFromRequest(body);
    console.log(JSON.stringify(stats));
    return res.status(200).json({
        success: true
    }).send();
});
  

app.listen(port, () => {
  console.log(`API started on port ${port}!`);
})