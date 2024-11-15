import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

enum State {
  PERFECT = 'perfect',
  GOOD = 'good',
  NEED_REPAIR = 'need_repair',
}

@Schema()
export class House {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string[];

  @Prop({ required: true })
  totalRooms: number;

  @Prop({ required: true })
  bathroom: number;

  @Prop({ required: true })
  livingRoom: number;

  @Prop({ default: false })
  garage: boolean;

  @Prop({ required: true, enum: State, default: State.GOOD })
  state: State;

  @Prop({
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  })
  location: { type: 'Point'; coordinates: [number, number] };

  @Prop({ required: true })
  square: number;

  @Prop({ required: true })
  price: number;
}

export const houseSchema = SchemaFactory.createForClass(House);
houseSchema.index({ location: '2dsphere' });
