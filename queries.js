require('dotenv').config()

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.SSL === 'TRUE'
});

const getUsers = (request, response) => {
  pool.query('select * from users order by id asc', (error, results) => {
    if (error) {
      throw error;
    }
    response.render('users.ejs', { users: results.rows })
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'select * from users where id = $1',
    [id],
    (error, results) => {
      if(error) {
        throw error;
      };
      response.render('user.ejs', { user: results.rows[0] })
      //response.status(200).json(results.rows);
    });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    'insert into users (name, email) values ($1, $2)',
    [name, email],
    (error, results) => {
      if(error) {
        throw error;
      };
      response.status(201).send('User added!');
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'update users set name = $1, email = $2 where id = $3',
    [name, email, id],
    (error, results) => {
      if(error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    'delete from users where id = $1',
    [id],
    (error, results) => {
      if(error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};