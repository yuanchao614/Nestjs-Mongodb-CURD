import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User extends Document {
  @Prop()
  userName: string;

  @Prop()
  passWord: string;

  @Prop()
  email: string;

  @Prop()
  userType: string;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);