import { Model, Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';
import isEmail from 'validator/lib/isEmail';
import { IAuthUser } from '../types/auth-user.type';

const countrySchema = new Schema(
  {
    _id: {
      type: Schema.Types.UUID,
      required: true,
      default: randomUUID,
    },
    emailAddress: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      validate: [isEmail],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: false,
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform: function (doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const Country = model<IAuthUser, Model<IAuthUser>>('Auth_User', countrySchema, 'auth_users');
