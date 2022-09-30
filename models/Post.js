const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        salary: {
            type: String,
            required: true,
        }
    }
)

postSchema.index({ category: 'text'});
module.exports = mongoose.model('Post', postSchema);