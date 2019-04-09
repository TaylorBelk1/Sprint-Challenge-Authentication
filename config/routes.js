const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwtSecret = require('./secrets');
const { authenticate, generateToken } = require('../auth/authenticate');
const bcrypt = require('bcryptjs');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration		
  
  const { username, password } = req.body;
  const creds = { username, password };
  
 	const hash = bcrypt.hashSync(creds.password, 15);
   creds.password = hash;
  
 	db('users')
		.insert(creds)
		.then(([id]) => {
			const token = generateToken(id);
			res.status(201).json({
				message: `User account ${creds.username} created`,
				token
			});
		})
		.catch(err => {
			res.status(500).json(err);
		});
}

function login(req, res) {
  // implement user login	
  const { username, password } = req.body;	
  const creds = { username, password };

 	db('users')
		.where({ username: creds.username })
		.then(([user]) => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				const token = generateToken(user);
				res
					.status(200)
					.json({ message: `User ${creds.username} logged in`, token });
			} else {
				res.status(401).json({ error: 'Not authorized' });
			}
		})
		.catch(err => res.status(500).json(err));
}


function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
