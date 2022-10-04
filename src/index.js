const express = require('express')
const app = express()
const port = 5000

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

app.post('/api/stats', (req, res) => {
    const body = req.body;
  
    console.log(body);
    return res.status(200).json({
        success: true
    }).send();
});
  

app.listen(port, () => {
  console.log(`API started on port ${port}!`);
})