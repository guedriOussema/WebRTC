const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    }
})

const Room = mongoose.model('Room', RoomSchema);

module.exports = { Room };