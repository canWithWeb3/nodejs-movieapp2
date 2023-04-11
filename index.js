const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
require("dotenv").config()

const app = express()

app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: "hello can",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}))

const locals = require("./middlewares/locals")
app.use(locals)

const path = require("path");
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes");


app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

// app.use("/admin", adminRoutes);
app.use("/admin", adminRoutes)
app.use(userRoutes)

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connect error: ${err}`))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server started listening on port: ${PORT}`))