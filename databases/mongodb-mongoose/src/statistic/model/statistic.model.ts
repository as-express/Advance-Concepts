import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Statistic {
  @Prop({ default: 0 })
  houses: number;

  @Prop({ default: 0 })
  highPrice: number;

  @Prop({ default: 0 })
  middlePrice: number;

  @Prop({ default: 0 })
  lowPrice: number;
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);
