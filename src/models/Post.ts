import { model, Schema } from 'mongoose';

// All validation should be handled in the controller
// keep models as minimal and simple as possible

const PostSchema: Schema = new Schema({
    userId: {
      type: 'Number'
    },
    id: {
      type: 'Number'
    },
    title: {
      type: 'String'
    },
    body: {
      type: 'String'
    },
    comments:[]
});

export const Post = model('Post', PostSchema);
