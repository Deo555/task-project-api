exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('movies').del()
  .then(() => {
    // Inserts seed entries
  return knex('movies').insert({
  title: 'The Lord of the Rings: The Return of the King',
  genre: 'Adventure',
  rating: 10,
  explicit: false
  });
  })
  .then(() => {
  return knex('movies').insert({
  title: '300',
  genre: 'Action',
  rating: 9,
  explicit: true
  });
  })
  .then(() => {
  return knex('movies').insert({
  title: 'Silent Hill',
  genre: 'Horror',
  rating: 5,
  explicit: true
  });
  })
  .then(() => {
  return knex('movies').insert({
  title: 'Ted 2',
  genre: 'Comedy',
  rating: 6,
  explicit: false
  });
  })
   .then(() => {
  return knex('movies').insert({
  title: 'The Bourne Ultimatum',
  genre: 'Action',
  rating: 8,
  explicit: false
  });
  })
   .then(() => {
  return knex('movies').insert({
  title: 'Chernobyl',
  genre: 'Documentary',
  rating: 10,
  explicit: false
  });
  })
   .then(() => {
  return knex('movies').insert({
  title: 'Gladiator',
  genre: 'Action',
  rating: 10,
  explicit: true
  });
  })
   .then(() => {
  return knex('movies').insert({
  title: 'Bad Boys',
  genre: 'Comedy',
  rating: 7,
  explicit: false
  });
  })
   .then(() => {
  return knex('movies').insert({
  title: 'Star Wars - Revenge of the Sith',
  genre: 'Sci-Fi',
  rating: 9,
  explicit: false
  });
  })
   .then(() => {
  return knex('movies').insert({
  title: 'Paranormal Activity',
  genre: 'Horror',
  rating: 2,
  explicit: true
  });
  })
   .then(() => {
  return knex('movies').insert({
  title: 'Star Wars - The Last Jedi',
  genre: 'Sci-Fi',
  rating: 1,
  explicit: false
  });
  })
   .then(() => {
  return knex('movies').insert({
  title: 'Star Wars - Rogue One',
  genre: 'Sci-Fi',
  rating: 8,
  explicit: false
  });
  })
 };