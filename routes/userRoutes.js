const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('../schema');
const resolvers = require('../resolvers');

const router = express.Router();
const server = new ApolloServer({ typeDefs, resolvers });

server.start();

// localhost:3001/users/register
router.post('/register', async (req, res) => {
  const { fname, lname, username, phone, email, password } = req.body;

  try {
    const { data, errors } = await server.executeOperation({
      query: gql`
        mutation {
          createUser(input: { fname: "${fname}", lname:"${lname}", username:"${username}", phone:${phone} email: "${email}", password: "${password}" }) {
            fname
            lname
            username
            phone
            email
            password
          }
        }
      `,
    });
    if (errors) {
      return res.status(500).send({ message: errors[0].message });
    }
    else{
    res.status(201).send(data);
    
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get('/getusers', async (req, res) => {
  try {
    const { data, errors } = await server.executeOperation({
      query: gql`
        query {
          getAllUsers {
            fname
            lname
            username
            phone
            email
            password
          }
        }
      `,
    });

    if (errors) {
      return res.status(500).send({ message: errors[0].message });
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
