import { Schema, model, models, ObjectId } from 'mongoose';
import { UserFromDB } from '@models/user';

const SnippetSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  snippet: {
    type: String,
    required: [true, 'Snippet is required.'],
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
  },
});

const Snippet = models.Snippet || model('Snippet', SnippetSchema);

type SnippetType = {
  _id: ObjectId;
  creator: UserFromDB;
  snippet: string;
  title: string;
  description: string;
};

export type SnippetFromDB = SnippetType | null;

export default Snippet;
