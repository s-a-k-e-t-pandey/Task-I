"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const claimSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    curPoints: {
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
const Claim = mongoose_1.default.model('Claim', claimSchema);
exports.default = Claim;
