/* todo, setja upp express */
const express = require('express');
const path = require('path');

const lectures = require('./lectures');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', lectures);

app.get('/', (req, res) => {
  // `title` verður aðgengilegt sem breyta í template
  res.render('index', { title: 'Forsíða' });
});

/*
Setja upp villumeðhöndlun frá fyrirlestri 2, og bæta við resrender
vilumeðhöndlun sem er í lectures.js

app.get('/error', (req, res) => {
    throw new Error('Villa!');
});
*/

function notFoundHandler(req, res, next) { // eslint-disable-line 
  const title = '404 Error';
  const text = 'Síðan finnst ekki';
  const message = 'Efnið sem á að birta finnst ekki';
  res.status(404).render('error', { title, text, message });
}


function errorHandler(err, req, res, next) { // eslint-disable-line 
  const title = '500 Error';
  const text = 'Villa hjá innri vefþjón';
  const message = 'Vesen á vefþjón';
  res.status(500).render('error', { title, text, message });
}

/*
Ef við skilgreinum ekki error handling middleware fáum við sjálfgefin
skilaboð frá express um villu
*/
app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
