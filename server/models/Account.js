const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const accountSchema = new Schema({
    account:{
        type: String,
        required: [true, 'account field is required.']
    },
    password:{
        type: String,
        required: [true, 'password field is required.']
    },
    name1:{
        type: String,
        required: [true, 'name1 field is required.']
    },
    name2:{
        type: String,
        required: [true, 'name2 field is required.']
    },
    date:{
        type: String,
        required: [true, 'date field is required.']
    }
}
,{
    collection: 'account',
    //timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
)
  
// Creating a table within database with the defined schema
const Account = mongoose.model('account', accountSchema)

// Exporting table for querying and mutating
export default Account