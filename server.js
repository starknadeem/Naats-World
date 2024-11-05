const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

dotenv.config();

// files imports
const connectDB = require("./DBconnection");
const Routermanager = require('./Routes/Routesmanager');

// DATABASE CONNECTED HERE
connectDB().then((isConnected) => {
  if(isConnected)
    {
    startServer();
    }
    else{
      console.log("Server won't start due to database connection failure.");
    }
});

function startServer() {  //MAIN SERVER
    
    // Middlewares
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/api/public/upload', express.static('public/upload'));


    // configs
 

    //Routes
    app.get("/", (req, res) => {
    res.send("WORKING");
  });

  app.use("/api/", Routermanager);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`SERVER IS STARTING AT ${PORT}`);
  });
}