const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//const knex = require('knex')

//middleware
app.use(cors());
app.use(express.json()); 




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


//get all movies
app.get("/api/v1/movies", async (req, res) => {
  try {
    const allMovies = await pool.query("SELECT * FROM movie");
    res.json(allMovies.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a single movie
app.get("/api/v1/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await pool.query("SELECT * FROM movie WHERE movie_id = $1",  //more specific
    [id]);
    res.json(movie.rows[0]); //gets 1st item
  } catch (err) {
    console.error(err.message);
  }
});

//add movie
app.post ("/api/v1/movies" , async (req,res) => {
  try {
      const {description} = req.body //creating todo? .. client side
      const newMovie = await pool.query(
          "INSERT INTO movie (description) VALUES($1) RETURNING *", //postgres komande $1 je placeholder za description u ovom slucaju
      [description]); //inserting in db
      res.json(newMovie.rows[0]); //where data is located at
  } catch (err) {
      console.error(err.message);
  }
});

//update movie
app.put("/api/v1/movies/:id", async (req, res) => {
  try {
    const { id } = req.params; //id
    const { description } = req.body; //data 
    const updateMovie = await pool.query(
      "UPDATE movie SET description = $1 WHERE movie_id = $2", //most complex
      [description, id] 
    );

    res.json("Movie was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete movie
app.delete("/api/v1/movies/:id ", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovie = await pool.query("DELETE FROM movie WHERE movie_id = $1", [
      id
    ]); //we just need to know where its located (id)
    res.json("Movie was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});


//listens port
app.listen(5000, () => {
  console.log("server has started on port 5000");
});