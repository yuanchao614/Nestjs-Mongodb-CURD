import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = File & Document;
@Schema()
export class File extends Document {
  @Prop()
  filename: string;

  @Prop()
  contentType: string;

  @Prop()
  md5: string;

  @Prop()
  chunkSize: number;

  @Prop()
  uploadDate: Date;

  @Prop()
  length: number;
}

export const FileSchema = SchemaFactory.createForClass(File);