const express = require("express");
const app = express();
var fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const port = 3001;
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/api", (req, res) => {
  const uniqueInsuranceId = uuidv4();
  fs.writeFile(`${uniqueInsuranceId}.json`, JSON.stringify(req.body), (err) => {
    if (err) {
      console.log(err);
      res.send("Can not add object");
    } else {
      res.send(uniqueInsuranceId);
    }
  });
});

app.get("/api/:id", (req, res) => {
  fs.readFile(`${req.params.id}.json`, (err, data) => {
    if (err) {
      console.log(err);
      res.send("Can not find object");
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.put("/api/:id", (req, res) => {
  fs.readFile(`${req.params.id}.json`, (err, data) => {
    if (err) {
      console.log(err);
      res.send("Can not find " + req.params.id);
    } else {
      fs.writeFile(`${req.params.id}.json`, JSON.stringify(req.body), (err) => {
        res.send(`Content has been updated successfully`);
      });
    }
  });
});

app.delete("/api/:id", (req, res) => {
  fs.writeFile(`${req.params.id}.json`, JSON.stringify(req.body), (err, data) => {
    if (err) {
      console.log(err);
      res.send("Can not find" + req.params.id);
    } else {
      res.send('Cleared, current content');
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port
${port}`);
});
