const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    // Enter your own database information here based on what you created
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'db'
    }
  });
  

// Your goal is to design a RESTful API for a single resource - movies. The API itself should 
// follow RESTful design principles, using the basic HTTP verbs: GET, POST, PUT, and 
// DELETE. 
 
// You can use this snippet below as basis for database schema, it’s also an example of knex.js 
// database migration definition.

// exports.up = (knex, Promise) => { 
//     return knex.schema.createTable('movies', (table) => { 
//       table.increments(); 
//       table.string('name').notNullable().unique(); 
//       table.string('genre').notNullable(); 
//       table.integer('rating').notNullable(); 
//       table.boolean('explicit').notNullable(); 
//     }); 
//   }; 
   
//   exports.down = (knex, Promise) => { 
//     return knex.schema.dropTable('movies'); 
//   };

// Add proper configuration for Knex.js with knexfile.js in root of the project. Also, in root of 
// the project create folder db where you will put your migrations, seeds folders and 
// connection.js file. Example below: 
 
// db 
// ├── connection.js 
// ├── migrations 
// │   ├── 20170817152841_movies.js 
// └── seeds 
//     ├── movies_seed.js 
 
// connection.js. will well, connect to the database using the appropriate Knex.js configuration 
// based on the environment (development, production, etc.) you can use example bellow. 
 
// const environment = process.env.NODE_ENV || 'development'; 
// const config = require('../../../knexfile.js')[environment]; 
// module.exports = require('knex')(config); 
 
// Create seed file with  
 
// $ knex seed:make movies_seed 
// Update it to have some sample of data, use example bellow as starting point. 
 
// exports.seed = (knex, Promise) => { 
//   return knex('movies').del() 
//   .then(() => { 
//     return knex('movies').insert({ 
//       name: 'The Land Before Time', 
//       genre: 'Fantasy', 
//       rating: 7, 
//       explicit: false 
//     }); 
//   }) 
//   .then(() => { 
//     return knex('movies').insert({ 
//       name: 'Jurassic Park', 
//       genre: 'Science Fiction', 
//       rating: 9, 
//       explicit: true 
//     }); 
//   }) 
//   .then(() => { 
//     return knex('movies').insert({ 
//       name: 'Ice Age: Dawn of the Dinosaurs', 
//       genre: 'Action/Romance', 
//       rating: 5, 
//       explicit: false 
//     }); 
//   }); 
// };


const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})



//ovo ce bit return all movies
app.get('/api/v1/movies', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
})
//ovo ce bit return single movie
app.get('api/v1/movies/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
      .then(user => {
        if (user.length) {
          res.json(user[0])
        } else {
          res.status(400).json('Not found')
        }
      })
      .catch(err => res.status(400).json('error getting user'))
  })

//add movie
app.post('/api/v1/movies', (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
})

//update movie
app.put('/api/v1/movies/:id ', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
})

//delete movie
app.delete('/api/v1/movies/:id')

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})