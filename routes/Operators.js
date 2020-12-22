const express = require('express');
const operators = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Operator = require('../models/Operator');
const Sequelize = require('sequelize');
operators.use(cors());
const authenticated = require('../middlewares/authenticated');


//operator sign up
operators.post('/signup', (req, res) => {
  const today = new Date();
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    created: today,
  };

  Operator.findOne({
    where: {
      email: req.body.email,
    },
  })
    //TODO bcrypt
    .then((operator) => {
      if (!operator) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          Operator.create(userData)
            .then((operator) => {
              res.json({ status: operator.email + ' Registered!' });
            })
            .catch((err) => {
              res.send('error: ' + err);
            });
        });
      } else {
        res.status(400).json({ error: 'User already exists' });
      }
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});


//operator login
operators.post('/login', async (req, res) => {
  console.log('Operator Logiun', req.body);
  await Operator.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((operator) => {
      if (!operator) {
        res.status(400).send({ error: 'Invalid Credentials' });
      }

      if (bcrypt.compareSync(req.body.password, operator.password)) {
        let token = jwt.sign(operator.dataValues, process.env.JWTSECRET);
        res.send(token);
      } else {
        res.status(400).json({ error: 'Invalid Credentials' });
      }

    })
    .catch((err) => {
      res.status(400).json({ error: err });
    }
    );
});

//Operator Dashboard
operators.get('/operator-dashboard', (req, res) => {
  var decoded = jwt.verify(req.headers['x-auth-token'], process.env.JWTSECRET);

  Operator.findOne({
    where: {
      id: decoded.id,
    },
  })
    .then((operator) => {
      if (operator) {
        res.json(operator);
      } else {
        res.send('User does not exist');
      }
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

// Add new Vehicle




module.exports = operators;
