const { json } = require("body-parser");
const express = require("express");
const route = express.Router();
const fs = require("fs");
const path = `${__dirname}/../users.json`;
// this is the controller
const data = fs.readFileSync(path);
const myObject = JSON.parse(data);
// get All user
route.get("/", (req, res) => {
  console.log(myObject);
  res.status(200).send(myObject);
});
// create a user
route.post("/", (req, res) => {
  const newUser = req.body;
  myObject.push(newUser);
  console.log(myObject);
  const newFile = JSON.stringify(myObject);
  fs.writeFileSync(path, newFile);
  res.send("user successfully added");
});
// get one user by id
route.get("/:id", (req, res) => {
  const id = req.params.id;
  const targetUser = myObject.filter((user) => {
    console.log("test id", user.id);
    return user.id == id;
  });
  console.log(targetUser);
  res.send(targetUser);
});

// delete user
route.delete("/:id", (req, res) => {
  const { id } = req.params;
  const filteredUsers = myObject.filter((user) => user.id != id);
  console.log(filteredUsers);
  const newFile = JSON.stringify(filteredUsers);
  fs.writeFileSync(path, newFile);
  res.send("user succesfully deleted");
});
// update user
route.put("/:id", (req, res) => {
  const { id } = req.params;
  const updateUser = req.body;
  let isUserExist = false;
  const updatedUsers = myObject.map((user) => {
    if (user.id == id) {
      isUserExist = true;
      return updateUser;
    } else {
      return user;
    }
  });

  console.log('users', updatedUsers)
  if (!isUserExist) {
    res.send("there is no user with this id");
  } else {
    const newFile = JSON.stringify(updatedUsers);
    fs.writeFileSync(path, newFile);
    res.send("user successfully updated");
  }
});

module.exports = route;
