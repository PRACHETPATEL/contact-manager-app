const express=require("express");

require("dotenv").config();

const app=express();

app.use(express.json());


const logger=require("morgan");

const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const PORT=process.env.PORT || 5000;

connectDb();

app.use(logger("dev"));

app.use("/api/contact",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/usersRoutes"));

app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Listining port ${PORT}`);
})