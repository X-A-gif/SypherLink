const { Schema, model } = require('mongoose');

const chatsSchema = new Schema(
    {
        chat: {
            type: String,
            required: true,
        },
        sentBy: {
            type: String,
            required: true,
        },
        roomID: {
            type: Number,
            required: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Chats = model('Chats', chatsSchema);

module.exports = Chats;
