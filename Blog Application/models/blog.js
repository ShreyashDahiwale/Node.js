const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImageURL: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, { timestamps: true });


const Blog = model('Blog', blogSchema);

module.exports = Blog;