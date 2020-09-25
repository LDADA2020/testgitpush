const mongoose = require("mongoose")
const express = require('express')

mongoose.connect('mongodb://localhost:27017/dbtable', { useNewUrlParser: true, useUnifiedTopology: true })
const Schema = mongoose.Schema
const carSchema = new Schema({
    name: {
        type: String,
        default: "张三"
    },
    carImg: {
        type: String,
        default: ''
    },
    p: {
        type: mongoose.SchemaTypes.ObjectId, //表示的是和ID相关联起来的数据
        ref: 'People' //定义其指向为People
    }
})
const Car = mongoose.model("Car", carSchema, "car")
module.exports = Car