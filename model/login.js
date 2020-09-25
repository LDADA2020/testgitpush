const mongoose = require("mongoose")
const express = require('express')

mongoose.connect('mongodb://localhost:27017/dbtable', { useNewUrlParser: true, useUnifiedTopology: true })
const Schema = mongoose.Schema
const loginSchema = new Schema({
    username: {
        type: String,
        default: "admin"
    },
    password: {
        type: String,
        default: 'admin'
    },

})
const Login = mongoose.model("Login", loginSchema, "login")
module.exports = Login