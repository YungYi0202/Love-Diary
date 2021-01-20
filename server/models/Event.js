const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const eventSchema = new Schema({
    accountId:{
        type: String,
        required: [true, 'accountId field is required.']
    },
    todo:{
        type: Boolean,
        required: [true, 'todo field is required.']
    },
    favorite:{
        type: Boolean,
        required: [true, 'favorite field is required.']
    },
    title:{
        type: String,
        required: [true, 'title field is required.']
    },
    start:{//format:YYYY-MM-DDTHH:MM:SS
        type: String,
        //required: [true, 'start field is required.']
    },
    end:{
        type: String,
        //required: [true, 'end field is required.']
    },
    textColor:{
        type: String,
        //required: [true, 'textColor field is required.']
    },
    backgroundColor:{
        type: String,
        //required: [true, 'backgroundColor field is required.']
    },
    borderColor:{
        type: String,
        //required: [true, 'backgroundColor field is required.']
    },
    color:{
        type: String
    }
}
,{
    collection: 'event',
    //timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
)
  
// Creating a table within database with the defined schema
const Event = mongoose.model('event', eventSchema)

// Exporting table for querying and mutating
export default Event