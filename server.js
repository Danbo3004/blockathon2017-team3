/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
var bodyParser = require('body-parser')
const multer = require('multer')

const isDeveloping = process.env.NODE_ENV !== 'production';
const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
require('./server/router')(app)

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler, {
    heartbeat: 2000,
  }));

  const fs = middleware.fileSystem;
  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
  // app.use(express.static(__dirname + '/dist'));
  // app.get('/*', function (request, response) {
  //   response.sendFile(path.resolve(__dirname, 'dist/index.html'))
  // })
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  app.get('/*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'dist/index.html'))
  })
}

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.log('process.env.NODE_ENV: %s', process.env.NODE_ENV)
  console.log('process.env.PORT: %s', process.env.PORT)
});
