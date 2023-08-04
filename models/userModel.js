const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Falta Nombre']
    },
    email: {
        type: String, 
        required: [true, 'Falta Email'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Falta pass']
    }    
},
{
    timestamps: true 
})

module.exports = mongoose.model('User', userSchema)