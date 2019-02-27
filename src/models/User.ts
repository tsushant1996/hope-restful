import { model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  
    id: {
      type: 'Number'
    },
    name: {
      type: 'String'
    },
    username: {
      type: 'String'
    },
    email: {
      type: 'String'
    },
    avatar:{
      type: 'String'
    }
  
});

export const User = model('User', UserSchema);
