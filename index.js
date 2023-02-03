
import express from "express"
import dotenv from "dotenv"
// import session from "express-session"
// import MongoStore from "connect-mongo"

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI
//     })
//   })
// )



app.listen(PORT, ()=>{
  console.log(`Server is running on port: ${PORT}`)
})