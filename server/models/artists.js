const mongoose = require('mongoose');

const featuredWorkSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const artistSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  shortBio: {
    type: String,
    required: true,
  },
  fullBio: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  totalSold: {
    type: Number,
    required: true,
  },
  joinDate: {
    type: Date,
    required: true,
  },
  featuredWorks: {
    type: [featuredWorkSchema],
    required: true,
  },
});

const artists = mongoose.model('Artist', artistSchema);

module.exports = artists;
