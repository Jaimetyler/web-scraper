const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HeaderSchema = new Schema ({
    headline: {
        type: String,
        required: true
    },
    
    link: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Header = mongoose.model("Header", HeaderSchema);

module.exports = Header;