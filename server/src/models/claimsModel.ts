import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  curPoints:{
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Claim = mongoose.model('Claim', claimSchema);
export default Claim;
