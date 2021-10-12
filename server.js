const express = require('express');
const cors = require('cors');

const db = require('./db/connection');
const port = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.json());
app.use(cors());


//add movie
app.post('', (req, res) => {
	const movie = req.body;
  console.log (movie, 'movie req')
	if (movie.title === "" || movie.genre === ""){
		res.status(400).send({message: 'Required fields are missing'})
		return;
	}
	movie.explicit = (movie.explicit == "true") ? true : false
	db.insert(movie).into('movies')
	.then(rows => {
		res.status(201).send(rows);
		return;
	})
	.catch(err => {
		console.log(err);
		res.status(400).send({message: 'integrity violation'})
		return;
	})
});


//get all movies
app.get('', (req,res) => {
	db.select('*').from('movies').then(rows => {
		rows.map(row => {
			row.explicit = (row.explicit === 0) ? false: true;
			return row;
		});
		res.json(rows);
	});
});


//get a single movie
app.get('/:id',(req,res) => {

	db.select('*').from('movies').where('id',req.params.id)
	.then(rows => {
		if (rows.length == 0){
			res.status(404).send({ message: 'No movie found for id'});
			return;

		}
		rows.map(row => {
			row.explicit = (row.explicit === 0) ? false: true;
			//console.log("Row explicit je " + row.explicit);
			return row;
		})
		res.json(rows[0]);
	})
	.catch(err => {
		res.status(500).send({message: 'Server error'});
		return;
	});
});


//update movie
app.put('/:id',(req,res) =>{
  const movie = req.body;
  movie.explicit = (movie.explicit == "true") ? true : false
  db('movies').where('id', req.params.id).update(movie)
  .then(rows => {
  	if (rows == 0){
  		res.status(404).send({ message: 'No movie found for id'});
  	}
  	 //console.log("UPDATED " + rows);
  	 res.json({message: `Successfully updated ${rows} movie(s)`});
  })
  .catch(err => {
  	// console.log("ERR " + err);

  	 res.status(400).send({message: 'Integrity constraints have been violated'});
  })
});


//delete movie
app.delete('/:id',(req,res) => {
	db('movies').where('id',req.params.id).del()
	.then(numOfRows => {
		//console.log(numOfRows)
		if (numOfRows == 0){
			res.status(404).send({ message: 'No movie found for id'});
		}
		res.json({message: `Successfully deleted ${numOfRows} movie(s)`});
	})
});




//listens port
app.listen(port, () => {
	console.log('Server has started on port 3001');
});


 