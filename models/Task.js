const mongoose = require('mongoose');

const Task = new mongoose.Schema({
  name: {
    type: 'string',
    trim: true,
    maxlength: [25, 'Max length is 25 characters'],
    required: [true, 'Name is required.'],
  },
  completed: { type: 'boolean' },

  default: false,
});

module.exports = mongoose.model('Task', Task);
