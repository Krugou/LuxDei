// ChatMessage.js

import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    countryid: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    // Add any additional fields you need here
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;