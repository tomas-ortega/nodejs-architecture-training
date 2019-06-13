let express = require('express');
let app = express();

let logError = (err, req, res, next) => {
  console.log("ERROR: " + err.stack);
  next(err);
};

let clientErrorHandler = (err, req, res, next) => {
  console.log("REQ: " + req);
  res.status(500).send({error: 'Algo ha fallado!'});
};

app.use('/', (req, res, next) => {
  let result = 0 / 0;
  next(new Error('Fail!!!!'));
});

app.use(logError);
app.use(clientErrorHandler);

app.listen(3000);
