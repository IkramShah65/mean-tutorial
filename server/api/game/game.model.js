'use strict';

import mongoose from 'mongoose';

var GameSchema = new mongoose.Schema({
  name: String,
  platform: String,
  genre: String
});

export default mongoose.model('Game', GameSchema);
