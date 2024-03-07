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
    },
    Game:{
        reviews(parent){
            return dummy_db.reviews.filter(({game_id})=>game_id===parent.id)
        }
    },
    Review:{
        author(parent) {
            return dummy_db.authors.find((a) => a.id === parent.author_id)
          },
        game(parent) {
        return dummy_db.games.find((g) => g.id === parent.game_id)
        }
    },
    Author:{
        reviews(parent){
            return dummy_db.reviews.filter(({author_id})=>author_id===parent.id)
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