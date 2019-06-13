let express = require('express');
let app = express();

/** MIDDLEWARE APPLICATION LEVEL*/

/*Middleware without endpoint access*/
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

/*Middle with endpoint access*/
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});

app.use('/user/:id', (req, res,	next) => {
  res.status(200).send('Request Type: '+ req.method + ' / ' + 'User Id: ' + req.params.id);
});

app.listen(3000);
