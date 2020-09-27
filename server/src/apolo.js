const { ApolloServer, gql } = require('apollo-server-express');
const { json } = require('express');
const { prisma } = require('./prisma/generated/prisma-client')
// type Book{..,  author: Author}   

// type Query {..,  
// Authors: [Author!]
// Author(id: Int!): Author
// }  

//schema definition: (query functions + objects) definition
const typeDefs = gql`
type Book {
  id: ID!
  title: String!
  pages: Int
  chapters: Int
  authors: [Author!]!
}

type Author {
  id: ID!
  name: String!
  books: [Book!]!
}

type Query {
  books: [Book!]
  book(id: ID!): Book
  authors: [Author!]
}

type Mutation {
  book(title: String!, authors: [String!]!, pages: Int, chapters: Int): Book!
}

`;


//implementation of (query functions + objects) 
const resolvers = {
  Mutation: {
    book: async (root, args, context, info) => {
      let authorsToCreate = [];
      let authorsToConnect = [];

      for (const authorName of args.authors) {
        const author = await context.prisma.author({ name: authorName });
        if (author) authorsToConnect.push(author);
        else authorsToCreate.push({ name: authorName });
      }

      return context.prisma.createBook({
        title: args.title,
        pages: args.pages,
        chapters: args.chapters,
        authors: {
          create: authorsToCreate,
          connect: authorsToConnect,
          
        }
      });
    }
  },
  Query: {
    books: (_, __, context, ___) => context.prisma.books(),
    book: (root, args, context, info) => context.prisma.book({ id: args.id }),
    authors: (root, args, context, info) => context.prisma.authors()
  },
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


  // notice the resolvers for the fields with scalar types in Book and Author was omitted. 
  // This is because the GraphQL can infer them by matching the result to a property of the same name from the parent parameter.
  Book: {
    authors: (parent, args, context) => context.prisma.book({ id: parent.id }).authors()
  },
  Author: {
    books: (parent, args, context) =>
    context.prisma.author({ id: parent.id }).books()
  }};



const server = new ApolloServer({ typeDefs, resolvers ,   context: { prisma }});

module.exports = server;





