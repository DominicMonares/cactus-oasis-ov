/*

decide between Cassandra or Mongo

Cassandra:
- stored in non-relational partitions
- good for highly scalable cloud apps, multiple machines
- table data structure
- has its own query language'

Mongo: - WINNER
- stored in json doc
- ideal for single view data app
- limited scalability
- object data structure
- uses queries structured into JSON fragments

*/

const mongoose = require('mongoose');
// mongoose.connect('')

let productSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  campus: {type: String, default: 'hr-rpp'},
  name: {type: String, required: true},
  slogan: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  default_price: {type: String, required: true},
  created_at: {type: String, required: true},
  updated_at: {type: String, required: true},
  features: {type: Array, required: true}
});

let styleSchema = new mongoose.Schema({
  styles: {type: Array}
})

let reviewSchema = new mongoose.Schema({
  reviews: {type: Array}
})

let cartSchema = new mongoose.Schema({
  cartData: {type: Array}
})
