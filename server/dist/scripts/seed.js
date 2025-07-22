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
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const MONGODB_URI = "mongodb://localhost:27017/your-db-name";
const seedUsers = [
    { firstName: "Mohit", lastName: "Singh" },
    { firstName: "Vishal", lastName: "Anand" },
    { firstName: "Shubham", lastName: "Negi" },
    { firstName: "Utkarsh", lastName: "Rajawat" },
    { firstName: "Ankit", lastName: "Kumar" },
    { firstName: "Rohit", lastName: "Verma" },
    { firstName: "Priya", lastName: "Sharma" },
    { firstName: "Neha", lastName: "Gupta" },
    { firstName: "Rahul", lastName: "Yadav" },
    { firstName: "Pooja", lastName: "Singh" }
];
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(MONGODB_URI);
            console.log("Connected to MongoDB");
            yield userModel_1.default.deleteMany({});
            yield userModel_1.default.insertMany(seedUsers);
            console.log("Seeded users!");
            yield mongoose_1.default.disconnect();
        }
        catch (err) {
            console.error("Seeding error:", err);
            process.exit(1);
        }
    });
}
seedDatabase();
