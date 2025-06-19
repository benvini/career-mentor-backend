import mongoose, { Schema, Document } from "mongoose";

export interface ISurvey extends Document {
  userId: mongoose.Types.ObjectId;
  answers: Record<string, unknown>;
  aiPlan?: string;
  createdAt: Date;
}

const SurveySchema = new Schema<ISurvey>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  answers: { type: Object, required: true },
  aiPlan: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISurvey>("Survey", SurveySchema);
