require("dotenv").config();
const bcrypt = require("bcrypt");

const { Pool } = require("pg");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.SSL === "TRUE"
});

const getUsers = (request, response) => {
  pool.query("select * from users order by id asc", (error, results) => {
    if (error) {
      throw error;
    }
    response.render("users.ejs", { users: results.rows });
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("select * from users where id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.render("user.ejs", { user: results.rows[0] });
    //response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "insert into users (name, email) values ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("User added!");
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "update users set name = $1, email = $2 where id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("delete from users where id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const signUpUser = async (request, response) => {
  try {
    const client = await pool.connect();
    const { email, password, name } = request.body;
    await client.query("BEGIN");
    console.log("origin password:", password);
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log("hashedPassword:", hashedPassword);
    await JSON.stringify(
      client.query(
        'SELECT id FROM "users" WHERE "email"=$1',
        [email],
        (err, result) => {
          if (result.rows[0]) {
            console.log("this email was registered");
            //request.flash('info', 'this email was registered')
            response.status(422).send("user already existed");
          } else {
            client.query(
              "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
              [name, email, hashedPassword],
              (err, result) => {
                client.query("COMMIT");
                response.status(201).send("user signup success");
                return;
              }
            );
          }
        }
      )
    );
    client.release();
  } catch (e) {
    throw e;
  }
};

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, username, password, done) => {
      console.log("strategy is here");
      loginAttempt();
      async function loginAttempt() {
        const client = await pool.connect();
        try {
          await client.query("BEGIN");
          const currentAccountsData = await JSON.stringify(
            client.query(
              'SELECT id, "name", "email", "password" FROM "users" WHERE "email"=$1',
              [username],
              (err, result) => {
                if (err) {
                  return done(err);
                }
                if (result.rows[0] === null) {
                  return done(null, false);
                } else {
                  bcrypt.compare(
                    password,
                    result.rows[0].password,
                    (error, check) => {
                      if (error) {
                        return done();
                      } else if (check) {
                        console.log("result.rows[0]");
                        console.log(result.rows[0]);
                        return done(null, [
                          {
                            email: result.rows[0].email,
                            name: result.rows[0].name
                          }
                        ]);
                      } else {
                        return done(null, false);
                      }
                    }
                  );
                }
              }
            )
          );
        } catch (e) {
          throw e;
        }
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  signUpUser
};
