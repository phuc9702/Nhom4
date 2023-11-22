const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShoeSchema = new Schema({
    maGiay: {
        type: String,
        required: true,
    },
    tenGiay: {
        type: String,
        required: true,
    },
    hangSX: {
        type: String,
        required: true,
    },
    kieuGiay: {
        type: String,
        required: true,
    },
    soLuong: {
        type: Number,
        required: true,
    },
    gia: {
        type: Number,
        required: true,
        min: 0,
    }
})

module.exports = mongoose.model('Shoes',ShoeSchema)