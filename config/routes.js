const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const { authenticate, generateToken } = require('../auth/authenticate');


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration		
  
  let user = req.body;
 	let hash = bcrypt.hashSync(user.password, 10);
   user.password = hash;
  
 	db('users')
		.insert(user)
		.then(([id]) => {
			const token = generateToken(id);
			res.status(201).json({
				message: `User account ${username} created`,
				token
			});
		})
		.catch(err => {
			res.status(500).json(err);
		});
}	


function login(req, res) {
  // implement user login	
  let { username, password } = req.body;

 	db('users')
		.where({ username: username })
		.then(([user]) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res
					.status(200)
					.json({ message: `User ${username} logged in`, token });
			} else {
				res.status(401).json({ error: 'Not authorized' });
			}
		})
		.catch(err => res.status(500).json(err));
}	


function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => res.status(500).json(err));
  }