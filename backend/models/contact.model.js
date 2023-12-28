const mongoose = require('mongoose')
const Schema=mongoose.Schema;
const contactSchema =new Schema(
  {
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      require:true,
      ref:"User"
    },
    name: {
      type: String,
      required: [true, 'Please add Contact name']
    },
    email: {
      type: String,
      required: [true, 'Please add email address']
    },
    contact: {
      type: String,
      required: [true, 'Please add contact number']
    }
  },
  {
    timestamps: true
  }
)
const Contact=mongoose.model('Contact', contactSchema);
module.exports = Contact;
