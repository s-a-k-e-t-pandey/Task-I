"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const UserBody = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    points: zod_1.default.number()
});
exports.default = UserBody;
