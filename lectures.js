const express = require('express');
const fs = require('fs');
const util = require('util');
const wrap = require('./wrap.js');

const readFile = util.promisify(fs.readFile);

const router = express.Router();
// const lecturesPath = './lectures';

// async function read

async function lesaskra() {
  const skra = await readFile('./lectures.json');

  const json = JSON.parse(skra);
  return json;
}


function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
  // Búa til fall sem les lectures.json af disk. (async)
}

async function list(req, res) {
  /* todo útfæra */
  // lesa fyrirlestrana

  const title = 'Fyrirlestrar';
  const data = await lesaskra(); // await því þetta er asynchrounus fall

  res.render('index', { title, lectures: data.lectures });

  // skoða javascript object description
}

async function lecture(req, res, next) {
  /* todo útfæra */

  const { slug } = req.params;
  const contentt = await lesaskra();

  const findContent = contentt.lectures.find(a => a.slug === slug);

  if (!findContent) {
    return next();
  }

  const { title } = findContent;
  const { category } = findContent;

  const html = wrap.createContent(findContent.content);

  return res.render('lecture', {
    title, html, category, lecture: findContent,
  });
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));


module.exports = router;
