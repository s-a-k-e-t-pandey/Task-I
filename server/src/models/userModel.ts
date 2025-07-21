import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// userSchema.virtual('fullName').get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });

// userSchema.set('toJSON', { virtuals: true });
// userSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', userSchema);
export default User;
