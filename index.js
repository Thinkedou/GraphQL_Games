import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"
import {typeDefs} from './schema.js'
import dummy_db   from "./dummy_db.js"

const resolvers = {
    Query:{
        games(){
            return dummy_db.games
        },
        reviews(){
            return dummy_db.reviews
        },
        authors(){
            return dummy_db.authors
        },
        game(_,args){        
            return dummy_db.games.find(({id})=>id===args.id)
        },
        author(_,args){        
            return dummy_db.authors.find(({id})=>id===args.id)
        },
        review(_,args){        
            return dummy_db.reviews.find(({id})=>id===args.id)
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server,{
    listen:{
        port:4000
    }
})


console.log('Server ready ', url)