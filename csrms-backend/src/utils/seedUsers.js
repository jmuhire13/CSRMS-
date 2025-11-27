const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 MongoDB Connected');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    await connectDB();

    // Clear existing users (optional - comment out if you want to keep existing users)
    // await User.deleteMany({});
    // console.log('🗑️  Cleared existing users');

    const users = [
      {
        name: 'Emma Irasetsa',
        email: 'e.irasetsa@alustudent.com',
        password: 'Password123',
        role: 'donor',
        phone: '+250788123456',
        isActive: true,
        isVerified: true
      },
      {
        name: 'Jean Muhire',
        email: 'jeanmuhir@gmail.com',
        password: 'password123',
        role: 'donor',
        phone: '+250788654321',
        isActive: true,
        isVerified: true
      },
      {
        name: 'Admin User',
        email: 'admin@csrms.com',
        password: 'admin123',
        role: 'admin',
        phone: '+250788111111',
        isActive: true,
        isVerified: true
      },
      {
        name: 'Social Worker',
        email: 'socialworker@csrms.com',
        password: 'social123',
        role: 'social-worker',
        phone: '+250788222222',
        district: 'Kigali',
        isActive: true,
        isVerified: true
      },
      {
        name: 'Caregiver User',
        email: 'caregiver@csrms.com',
        password: 'care123',
        role: 'caregiver',
        phone: '+250788333333',
        district: 'Kigali',
        isActive: true,
        isVerified: true
      }
    ];

    for (const userData of users) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`⚠️  User already exists: ${userData.email}`);
        continue;
      }

      // Create new user (password will be hashed by the pre-save hook)
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created user: ${userData.email} (${userData.role})`);
    }

    console.log('\n🎉 User seeding completed!');
    console.log('\n📋 Test Credentials:');
    console.log('-------------------');
    users.forEach(u => {
      console.log(`${u.role.toUpperCase()}: ${u.email} / ${u.password}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
