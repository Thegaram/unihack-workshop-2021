const cors = require('cors');
const express = require('express');

function main() {
  const app = express();
  const port = 80;

  // enable cors
  app.use(cors());

  // serve metadata
  app.get('/metadata/*', (req, _res, next) => {
    req.url += '.json';
    return next();
  });

  app.use('/metadata', express.static('public/metadata'));

  // serve images
  app.get('/images/*', (req, _res, next) => {
    req.url += '.png';
    return next();
  });

  app.use('/images', express.static('public/images'));

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  });
}

main();