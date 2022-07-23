const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let liquidMapSchema = new Schema({
  nameofmap: {
    type: String
  },
  metadata: {
    type: String
  },
  description: {
    type: String
  },
  lastupdated: {
    type: String
  },
  version: {
    type: Number, default: 0
  },
  versionMap:  [{
    version: String,
    contributor: String,
    metadata: String
  }]
}, {
    collection: 'liquidmaps'
  })

module.exports = mongoose.model('liquidmap', liquidMapSchema)