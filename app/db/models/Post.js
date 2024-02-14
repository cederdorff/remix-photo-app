import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  id: String,
  caption: String,
  createdAt: Number,
  image: String,
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  location: {
    latitude: Number,
    longitude: Number
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

// create post
// const postObject = {
//   id: "-M1Abcdefg123",
//   caption: "Beautiful sunset at the beach",
//   createdAt: 1687215634430,
//   image:
//     "https://images.unsplash.com/photo-1566241832378-917a0f30db2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
//   uid: newUser._id, // Reference to the user ObjectId
//   location: {
//     latitude: 56.1249541422341,
//     longitude: 10.218312555111716
//   }
// };

// const newPost = new Post(postObject);

// newPost
//   .save()
//   .then(savedPost => {
//     console.log("Post created and saved:", savedPost);
//   })
//   .catch(error => {
//     console.error("Error creating post:", error);
//   });
