let express = require('express');
let app = express();

let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', (req, res) => {
  let responseText = 'Hello World! - ';
  responseText += 'Request at: ' + req.requestTime + '';

  res.send(responseText);
});

app.listen(3000);
