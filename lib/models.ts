import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPlace extends Document {
    name: string;
    category: string;
    city: string;
    area: string;
    createdAt: Date;
    updatedAt: Date;
}

const PlaceSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ['Medical', 'Bank', 'Office', 'Shop', 'Food', 'Other'] },
    city: { type: String, required: true },
    area: { type: String, required: true },
}, {
    timestamps: true,
});

// Prevent model recompilation error in Next.js hot reload
export const Place: Model<IPlace> = mongoose.models.Place || mongoose.model<IPlace>('Place', PlaceSchema);

export interface IStatus extends Document {
    placeId: mongoose.Types.ObjectId;
    status: 'OPEN' | 'CLOSED';
    updatedBy: 'staff' | 'public';
    updatedAt: Date; // This will handle the auto-expiry logic check
}

const StatusSchema: Schema = new Schema({
    placeId: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    status: { type: String, enum: ['OPEN', 'CLOSED'], required: true },
    updatedBy: { type: String, enum: ['staff', 'public'], required: true },
}, {
    timestamps: true, // We will use createdAt/updatedAt for the time check
});

export const Status: Model<IStatus> = mongoose.models.Status || mongoose.model<IStatus>('Status', StatusSchema);
