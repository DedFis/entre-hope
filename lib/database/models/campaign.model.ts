import { model, models, Schema, Document } from "mongoose";

// Define the Campaign interface
export interface ICampaign extends Document {
    _id: string;
    owner: string; // Reference to User model's _id
    title: string;
    description: string;
    target: number;
    deadline: Date;
    amountCollected: number;
    image: string;
    donators: { _id: string, name: string }[]; // Array of User references
    donations: number[]; // Donation amounts
  }

const CampaignSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
  title: { type: String, required: true },
  description: { type: String, required: true },
  target: { type: Number, required: true },
  deadline: { type: Date, required: true },
  amountCollected: { type: Number, default: 0 },
  image: { type: String, required: true },
  donators: [{ type: Schema.Types.ObjectId, ref: 'User' }], // References to Users
  donations: { type: [Number] }, // Corresponding donation amounts
});

const Campaign = models.Campaign || model('Campaign', CampaignSchema);

export default Campaign;