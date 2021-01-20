const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const photoSchema = new Schema({
    accountId:{
        type: String,
        required: [true, 'accountId field is required.']
    },
    photoURL:{//base64
        type: String,
        required: [true, 'photoURL field is required.']
    },
    date:{
        type: String,
        required: [true, 'date field is required.']
    }
},
{
    collection: 'photo',
}
)
  
// Creating a table within database with the defined schema
const Photo = mongoose.model('photo', photoSchema)

// Exporting table for querying and mutating
export default Photo