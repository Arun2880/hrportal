const mongoose = require("mongoose");

const QuerySchema = mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    status: {
        type: String,
        enum: ["solve", "unsolve"],
        default: "unsolve" 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Query", QuerySchema);
