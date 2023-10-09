import mongoose from 'mongoose';



const LikeSchema = new mongoose.Schema({

  name: String,

  likes: Number,

  dislikes: Number,

});



const LikeModel = (name) => mongoose.model(`${name}Likes`, LikeSchema);



export default LikeModel;
