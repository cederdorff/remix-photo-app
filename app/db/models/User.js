import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: String,
  image: String,
  mail: String,
  name: String,
  title: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// create user
// const userObject = {
//   id: "ZfPTVEMQKf9vhNiUh0bj",
//   image:
//     "https://www.baaa.dk/media/b5ahrlra/maria-louise-bendixen.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921650330000&format=webp",
//   mail: "mlbe@eaaa.dk",
//   name: "Maria Louise Bendixen",
//   title: "Senior Lecturer"
// };

// const newUser = new User(userObject);

// newUser
//   .save()
//   .then(savedUser => {
//     console.log("User created and saved:", savedUser);
//   })
//   .catch(error => {
//     console.error("Error creating user:", error);
//   });
