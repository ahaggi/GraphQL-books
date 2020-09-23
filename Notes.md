(GraphQL + Prisma "ORM") vs firebase
https://www.prisma.io/blog/graphql-vs-firebase-496498546142



GraphQL vs Rest-API 
from GraphQL standpoint => https://www.howtographql.com/basics/1-graphql-is-the-better-rest/
    th biggest diffrence is how to fetch the data, let us say that we want to fetch the flwg data of a twitter "user":
    1- The titles of all the "posts" and, 
    2- the names of the user's "followers".

    Rest-API (Over- and Underfetching)
    Typically, we will have to access 3 end-points instead of one (underfetching)
        1- /users/<id>
            "(overfetching) this call will return all the details of the user, not just the name"
        2- /users/<id>/posts 
            "(overfetching) this call will return all the details of each post, not just the title"
        3- /users/<id>/followers
            "(overfetching) this call will return all the details of each follower/user, not just the name"


    GraphQL 
    We can send a single request:
    query{
        User(id:"123"){
            name
            posts{
                title
            }
            followers(last:3){
                name
            }
        }
    }



The GraphQL Schema
      The GraphQL schema is at the center of every GraphQL server, and it is written using the GraphQL schema language.

      The three types of operations you can run request from a GraphQL server:
      - the query type,  "is compulsory for any GraphQL schema"
      - mutation type, 
      - subscription type,  
      Along side built-in scalar types: Int, Float, Boolean, String, and ID.


      The Query type
      To fetch the data, but not to modifing; our schema needs to define queries that clients can execute against the data graph.

      The Mutation type
      To enable clients to modify data, the schema needs to define some mutations.


      The subscription type
      



Schema "Def of (query functions + objects)":
//TODO



Resolver "implementation of (query functions + objects)"
    Here we implement the object and query-functions that was defined in the "Schema"
      
    Objects:
        The fields in the properties are named after the types in our schema

    Functions in the Query type 
        function (root, args, context, info) { // function implementation }

        Those are the four (4) arguments that every resolver function receives
        1- root/parent: It contains the result of the previously executed resolver in the call chain. 
            To understand this arg, we need to look at the call chain, let us say that we have the flwg implementation for the "type Book"
              Book: {
                id: (parent, args) => parent.id,
                title: (parent, args) => {
                  console.log(parent)
                  return "Bla bla bla: "+ parent.title  // Notice how we appended "Bla bla bla: "
                }, 
              }


            when we excute "query {book(id:1){title}": the "resulted json object" will be mapped to the above implementation of "Book", and we call it "parent/root". 
            Notice the value of console.log(parent) and the diffrence between that and the final result with the appended string "Bla bla bla: "
        2- args: the args of the function!
        3- context: This is an object that every resolver can read from or write to. You can keep objects here that give access to database, contain information from the HTTP request headers or that contain information abt currently logged in user. 
        4- info: https://www.prisma.io/blog/graphql-server-basics-demystifying-the-info-argument-in-graphql-resolvers-6f26249f613a




-------------------------------------------------------------------------------



Fields 
    GraphQL is about asking for specific fields on objects

    for example if we have in some database the flwg:
    "hero": {
          "name": "R2-D2",
          "ability": "ability1",
          "details": "bla bla bla"
        }

    the graphQL query: // for example in Playground - http://localhost:4021/graphql
    {
      hero {
        name
      }
    }
    will return:
    {
      "data": {
        "hero": {
          "name": "R2-D2"
        }
      }
    }


Aliases 

    This will produce an error
    query {
      book(id:1){title}
      book(id:2){title}
    }

    But we can call the same function "book(id)" many times using aliases

    query {
      fstBook: book(id:1){title}
      sndBook: book(id:2){title}
    }

    {
      "data": {
        "fstBook": {
          "title": "Fullstack tutorial for GraphQL"
        },
        "sndBook": {
          "title": "Introductory tutorial to GraphQL"
        }
      }
    }