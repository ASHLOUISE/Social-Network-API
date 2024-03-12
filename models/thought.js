const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const dateFormat = require('../utils/dateformat');


const ThoughtSchema = new Schema({
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


ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);



module.exports = Thought;