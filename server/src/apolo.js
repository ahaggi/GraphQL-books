const { ApolloServer, gql } = require('apollo-server-express');
const { json } = require('express');

// type Book{..,  author: Author}   

// type Query {..,  
// Authors: [Author!]
// Author(id: Int!): Author
// }  

//schema definition: (query functions + objects) definition
const typeDefs = gql`
  type Book {
    id: Int!
    title: String!
    pages: Int
    chapters: Int
 }
  type Query {
    books: [Book!]
    book(id: Int!): Book
    test(id: Int!): String
  }
`;

//implementation of (query functions + objects) 
const resolvers = {
  // unnecessary to implement the "type Book", unless we need to process something; Take a look at the "title" field
  // Book: {
  //   id: (parent, args) => parent.id,
  //   title: (parent, args) => {
  //     console.log(parent)
  //     return "Bla bla bla: "+ parent.title  // Notice how we appended "The title:"
  //   }, 
  //   // pages: (parent, args) => parent.pages,
  //   // chapters: (parent, args) => parent.chapters
  // }
  // ,
  Query: {
    books: (_, __, ___, ____) => books,
    book: (parent, args, ___, ____) => {
      return books.find(elm => elm.id === args.id)
    },
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;







const books = [{
  id: 1,
  title: "Fullstack tutorial for GraphQL",
  pages: 356
}, {
  id: 2,
  title: "Introductory tutorial to GraphQL",
  chapters: 10
}, {
  id: 3,
  title: "GraphQL Schema Design for the Enterprise",
  pages: 550,
  chapters: 25
}];
