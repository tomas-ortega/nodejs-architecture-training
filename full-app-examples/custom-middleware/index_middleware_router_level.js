let express = require('express');
let app = express();
let router = express.Router();

/*First routing, log current time by console*/
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

/*Chaining user endpoint middleware*/
router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
}, (req, res, next) => {
  res.status(200).send("User ID: " + req.params.id);
});


/*Mount router on the app*/
app.use('/api/', router);


app.listen(3000);
