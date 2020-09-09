const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const fs = require('fs');
const path = require('path');

const FILE_DIR = path.resolve(__dirname, '..', 'files');
const FILE_PATH = path.resolve(FILE_DIR, 'file.txt');
const PORT = 3000;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* 
  Write a request handler that will write the request body to the file located at FILE_PATH 
  
  Use Postman to test. Note: you may have to change the body type in Postman to JSON
*/

app.post('/file', (req, res) => {

  const { body } = req;
  const serializedBody = JSON.stringify(body); 

  fs.writeFile(FILE_PATH, serializedBody, err => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  })
});

/* 
  Write a request handler that will read from the file located at FILE_PATH
  and send the information back to the client.

  Use Postman to test.
*/

app.get('/file', (req, res) => {
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
})
