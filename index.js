import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"
import {typeDefs} from './schema.js'
import dummy_db from "./dummy_db.js"

const resolvers = {
    Query:{
        games(){
            return dummy_db.games
        },
        game(parent,args,context){
            return dummy_db.games.find(({id})=>id===args.id)
        },
        reviews(){
            return dummy_db.reviews
        },
        review(parent,args,context){
            return dummy_db.reviews.find(({id})=>id===args.id)
        },
        authors(){
            return dummy_db.authors
        },
        author(parent,args,context){
            return dummy_db.authors.find(({id})=>id===args.id)
        }
    },
    Game:{
        reviews(parent){
            return dummy_db.reviews.filter(({game_id})=>game_id===parent.id)
        }
    },
    Review: {
        author(parent) {
          return dummy_db.authors.find((a) => a.id === parent.author_id)
        },
        game(parent) {
          return dummy_db.games.find((g) => g.id === parent.game_id)
        }
      },
    Author: {
        reviews(parent) {
            return dummy_db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Mutation:{
        deleteGame(parent,args){
                dummy_db.reviews = dummy_db.reviews.filter(({id})=> args.id!=id)
                return dummy_db.reviews
            },
        addGame(parent,args){
            const newGame={
                ...args.game,
                id: Math.floor(Math.random()*5000).toString()
            }
            dummy_db.games.push(newGame)
            return newGame
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


console.log('Server ready on port', 4000)