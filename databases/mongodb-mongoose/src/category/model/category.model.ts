import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { House } from 'src/house/model/house.model';

@Schema()
export class Category {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  houseCount: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }])
  houses: House[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
