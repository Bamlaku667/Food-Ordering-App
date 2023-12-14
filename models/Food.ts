import mongoose, { Schema, Model, Document } from "mongoose";


interface FoodDoc extends Document {
    VandorId: string
    name: string,
    description: string
    foodType: string,
    readyTim: string
    price: number
    rating: number
    images: [string]
}

const foodSchema = new Schema({
    VandorId: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: String },
    foodType: { type: String },
    readyTime: { type: String },
    price: { type: Number },
    rating: { type: Number },
    images: { type: [String] }

}, {
    timestamps: true, toJSON: {
        transform(doc, ret) {
            delete ret.__v,
                delete ret.createdAt,
                delete ret.updatedAt
        }
    }

})

const Food = mongoose.model<FoodDoc>('Food', foodSchema);

export { Food }