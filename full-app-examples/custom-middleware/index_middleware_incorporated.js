let express = require('express');
let app = express();

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
    res.set('my-custom-header', 'PAKITO!');
  }
}

app.use(express.static('public', options));

app.listen(3000);
