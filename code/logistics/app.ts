import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Router from "./application/routes";
import mongoose from 'mongoose'
import { env } from 'node:process';

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.use(Router);

console.log(env.database)

//ToDo: move this out
//----------------MONGO--------------------------
const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

let server = 'localhost'
if(env.database) server = env.database
const url = `mongodb://${server}:27017/logistics`
mongoose.connect(url, options).then(
  () => { console.log(`Connected to database! - ${url}`) },
  err => { console.log('Unable to connect to the database') }
);
//----------------------------------------------

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
