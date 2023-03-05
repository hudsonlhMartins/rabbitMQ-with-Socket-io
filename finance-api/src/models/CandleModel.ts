import mongoose, { Document, Model, model, Schema } from "mongoose";



export interface Candle {
    low: number
    high: number
    open: number
    close: number
    color: string
    finalDateTime: Date
    currency: string
    id?: string
}
const schema = new mongoose.Schema(
    {
        low: { type: Number, required: true },
        high: { type: Number, required: true },
        open: { type: Number, required: true },
        color: { type: String, required: true },
        finalDateTime: { type: Date, required: true },
        currency: { type: String, required: true }
    },
    {
      toJSON: {
        transform: (_, ret): void => {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        },
      },
    }
  );


  export const Candle = mongoose.model<Candle>('Candle', schema)