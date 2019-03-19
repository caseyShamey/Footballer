const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const faker = require('faker');
const knex = require('../database/knex.js');
const { Client } = require('pg');

const app = express();
const client = new Client();

// await client.connect()

app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const res = await client.query('SELECT * FROM feeds WHERE id = 10000000')
// feed endpoint
app.get('/feeds', (req, res) => {
  knex.select().from('feeds').limit(10)
    .then((data) => {
      // console.log(data.timestamp);
      res.send(data);
    });
});

app.post('/feeds', (req, res) => {
  knex('feeds').insert({
    author: 'Casey Shamey',
    authorphoto: 'https://loremflickr.com/320/240/face',
    title: `${faker.lorem.words()}`,
    bigphoto: 'https://loremflickr.com/620/400/football',
    smallphoto: 'https://loremflickr.com/1280/720/football',
    newsfeed: `${faker.lorem.paragraph()}`,
    videoclip: `${faker.internet.url()}`,
    timestamp: `${faker.date.between('2018-11-01', '2019-02-01')}`,
  })
    .then(() => {
      res.send('Data inserted');
    });
});

app.put('/feeds', (req, res) => {
  knex('feeds').where({ author: 'Casey Shamey' })
    .update({ author: 'Casey S Shamey' })
    .then(() => {
      res.send('Entry updated.');
    });
});

app.delete('/feeds', (req, res) => {
  knex('feeds').where('author', 'Casey S Shamey')
    .del();
  res.send('Deleted entry');
});

// Serve static assets if in production
// check to see if the node environment is in production

// if (process.env.NODE_ENV === 'production') {
//   // set static folder
//   // everyone is using create-react-app
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
