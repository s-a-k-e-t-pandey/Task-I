"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
});
// userSchema.virtual('fullName').get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });
// userSchema.set('toJSON', { virtuals: true });
// userSchema.set('toObject', { virtuals: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
