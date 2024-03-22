const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  department: String,
});

const User = mongoose.model("User", schema);

module.exports = User;

// app.post("/employee", async (req, res) => {
//   console.log("Create User Body", req.body);
//   const newUser = new User(req.body);
//   try {
//     await newUser.save({});
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ err: error });
//   }
// });
