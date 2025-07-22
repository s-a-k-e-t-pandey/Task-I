"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.claim = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const claimsModel_1 = __importDefault(require("../models/claimsModel"));
const rateLimiter_1 = __importDefault(require("../utils/rateLimiter"));
const socket_1 = require("../socket");
const pointGenerator = () => {
    return Math.floor(Math.random() * 10) + 1;
};
const claim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({
                msg: "User not Found"
            });
        }
        if (!(0, rateLimiter_1.default)(userId)) {
            return res.status(429).json({ message: 'Please wait before claiming again.' });
        }
        const pt = pointGenerator();
        user.totalPoints += pt;
        yield user.save();
        const fullName = `${user.firstName}" "${user.lastName}`;
        yield claimsModel_1.default.create({
            userId: user._id,
            userName: fullName,
            curPoints: user.totalPoints,
            points: pt
        });
        const topUsers = yield userModel_1.default.find()
            .sort({ totalPoints: -1 })
            .limit(10);
        socket_1.io === null || socket_1.io === void 0 ? void 0 : socket_1.io.emit('leaderboard:update', topUsers);
        res.json({ message: 'Points claimed', pt, totalPoints: user.totalPoints });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to claim points', error: err });
    }
});
exports.claim = claim;
