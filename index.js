const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

async function getRepos(req, res) {
  try {
    console.log('Fetching Data...');

    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

app.get('/repos/:username', getRepos);

app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});
