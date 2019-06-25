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
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

const Header = mongoose.model("Header", HeaderSchema);

module.exports = Header;