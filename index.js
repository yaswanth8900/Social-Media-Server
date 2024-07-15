const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const cors=require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const userApiFromRouter=require('./routes/userRoutes.js');
const url = "mongodb+srv://yash2004:yash2004@cluster0.gfw3rlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url, { useNewUrlParser:true,useUnifiedTopology: true })
.then(() =>{console.log("MongoDB Connected")})
.catch((err) =>{console.log(err)})

const connection = mongoose.connection;
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

const server = new ApolloServer({ typeDefs, resolvers });

app.use('/users',userApiFromRouter);

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();


// test('GraphQL server started and running',async ()=>{
//   const res = await request(app)
//   .post('/graphql',() =>{
//     query:`
//     query{
//       __schema{
//         queryType{
//           name
//         }
//       }
//     }
//     `
//   });
//   expect(res.statusCode).toBe(200); 
//   expect(res.body.data.__schema.queryType.name).toBe('Query');
// })
  
// function add(a,b){
//     return a+b;
// }
module.exports=app;