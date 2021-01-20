const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const contentSchema = new Schema({
    accountId:{
        type: String,
        required: [true, 'accountId field is required.']
    },
    date:{
        type: String,
        required: [true, 'date field is required.']
    },
    mood:{
        type: Number,
        required: [true, 'mood field is required.']
    },
    text:{
        type: String
    },
    photoText:{
        type: String
    }
}
,{
    collection: 'content',
    //timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
)
  
// Creating a table within database with the defined schema
const Content = mongoose.model('content', contentSchema)

// Exporting table for querying and mutating
export default Content