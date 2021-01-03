const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const fs = require("fs");
const userRoute = require("./routes/users")
// middleware converting json to js and js to json
app.use(express.json());

// routing middleware
app.use('/users', userRoute)




app.get("/ping", (req, res) => {
  res.send("pong");
})

app.listen(PORT, (err) =>
  err
    ? console.error(err)
    : console.log(`Your server is running on port ${PORT} `)
);
