import mongoose from "mongoose";
import User from "../models/userModel"; 
import dbClient from "../config/db";

const MONGODB_URI = process.env.MONGO_URI || "";

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


const seed = async () => {
  await dbClient();

  // Optional: Clear old data
  await User.deleteMany({});

  // Insert new users
  await User.insertMany(seedUsers.map(user => ({
    firstName: user.firstName,
    lastName: user.lastName,
  })));

  console.log("✅ Seeded users successfully");
  mongoose.connection.close(); 
};

seed().catch((err) => {
  mongoose.connection.close();
});

