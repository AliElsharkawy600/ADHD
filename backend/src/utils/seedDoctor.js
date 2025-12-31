const Parent = require("../models/Parent");
const bcrypt = require("bcryptjs");

async function seedDoctor() {
  const exists = await Parent.findOne({ role: "doctor" });
  if (exists) return;

  await Parent.create({
    name: "System Doctor",
    email: "doctor@system.com",
    password: await bcrypt.hash("Doctor@123", 10),
    
    role: "doctor",
    isVerified: true
  });
}

module.exports = seedDoctor;
