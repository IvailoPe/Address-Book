import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  faxNumber: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  labels: [{
    name: { type: String, required: true },
    color: { type: String, required: true }
  }],
  customFields: [{
    fieldName: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true }
  }]
});

const Contact = model('Contact', contactSchema);

export default Contact;
