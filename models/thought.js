const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const dateFormat = require('../utils/dateformat');


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const thought = model('Thought', thoughtSchema);



module.exports = thought;