var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var connect = mongoose.connect('mongodb://localhost/addBook');
var db = mongoose.connection;



var bookSchema = new mongoose.Schema({
	ids:{type:Number},
	title:{type:String,require:true},
	price:{type:Number,require:true},
	description:{type:String,require:true},
	image:{type:String}
},{collection:'books'});

var Book = module.exports =  mongoose.model('Book',bookSchema);