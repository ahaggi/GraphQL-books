https://www.telerik.com/blogs/graphql-schema-resolvers-type-system-schema-language-query-language


GraphQL Server:
inside ./server/ folder:

1- isntall the server (Express + GraphQL)
    npm init
    npm install express --save
    Then install one of the flwg:
        npm install graphql
        or
        npm install express express-graphql graphql
        or
        npm install apollo-server-express // use this if the frontend using ApoloClient
2- create GraphQL's Schema and resolver
3- run the server
    node fileName.js 
    or 
    nodemon main.js // if nodemon is installed
