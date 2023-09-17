import { Schema, model, models, ObjectId } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  image: {
    type: String,
  },
});

const User = models.User || model('User', UserSchema);

type UserType = {
  _id: ObjectId;
  email: string;
  username: string;
  image: string;
};

export type UserFromDB = UserType | null;

export default User;
