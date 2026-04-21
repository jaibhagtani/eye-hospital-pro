require('dotenv').config();
const mongoose = require('mongoose');
const Patient = require('./models/patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

const MONGO_URI = process.env.MONGO_URL;

// ─── Connect to MongoDB ────────────────────────────────────────────────────────
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
}

// ─── Clear existing data ──────────────────────────────────────────────────────
async function clearDatabase() {
  try {
    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    console.log('🗑️  Database cleared');
  } catch (err) {
    console.error('❌ Error clearing database:', err.message);
    throw err;
  }
}

// ─── Seed Doctors ─────────────────────────────────────────────────────────────
async function seedDoctors() {
  const doctors = [
    {
      name: 'Dr. Raj Kumar',
      specialty: 'cataract',
      qualifications: 'MBBS, MS (Ophthalmology)',
      experience: 15,
      available: true,
      consultationFee: 500,
      timings: {
        morning: { start: '09:00', end: '12:00' },
        evening: { start: '16:00', end: '19:00' }
      }
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'glaucoma',
      qualifications: 'MBBS, MS (Ophthalmology), Fellowship',
      experience: 12,
      available: true,
      consultationFee: 600,
      timings: {
        morning: { start: '10:00', end: '13:00' },
        evening: { start: '17:00', end: '20:00' }
      }
    },
    {
      name: 'Dr. Amit Patel',
      specialty: 'retina',
      qualifications: 'MBBS, MS (Ophthalmology), Retina Specialist',
      experience: 18,
      available: true,
      consultationFee: 700,
      timings: {
        morning: { start: '08:00', end: '11:00' },
        evening: { start: '15:00', end: '18:00' }
      }
    },
    {
      name: 'Dr. Neha Gupta',
      specialty: 'lasik',
      qualifications: 'MBBS, MS (Ophthalmology), LASIK Certified',
      experience: 10,
      available: true,
      consultationFee: 800,
      timings: {
        morning: { start: '09:30', end: '12:30' },
        evening: { start: '16:30', end: '19:30' }
      }
    },
    {
      name: 'Dr. Vikram Singh',
      specialty: 'general',
      qualifications: 'MBBS, MS (Ophthalmology)',
      experience: 8,
      available: true,
      consultationFee: 400,
      timings: {
        morning: { start: '09:00', end: '12:00' },
        evening: { start: '16:00', end: '19:00' }
      }
    }
  ];

  try {
    const createdDoctors = await Doctor.insertMany(doctors);
    console.log(`✅ ${createdDoctors.length} doctors seeded successfully`);
    return createdDoctors;
  } catch (err) {
    console.error('❌ Error seeding doctors:', err.message);
    throw err;
  }
}

// ─── Seed Patients ────────────────────────────────────────────────────────────
async function seedPatients(doctors) {
  const patientsData = [
    {
      name: 'Rajesh Kumar',
      phone: '9876543210',
      email: 'rajesh.kumar@example.com',
      age: 65,
      gender: 'Male',
      specialty: 'cataract',
      doctorId: doctors[0]._id,
      doctorName: doctors[0].name,
      isSurgeryPatient: true,
      tokenNumber: 1,
      status: 'waiting',
      languagePreference: 'English'
    },
    {
      name: 'Priya Patel',
      phone: '9876543211',
      email: 'priya.patel@example.com',
      age: 55,
      gender: 'Female',
      specialty: 'glaucoma',
      doctorId: doctors[1]._id,
      doctorName: doctors[1].name,
      isSurgeryPatient: false,
      tokenNumber: 2,
      status: 'waiting',
      languagePreference: 'English'
    },
    {
      name: 'Arjun Verma',
      phone: '9876543212',
      email: 'arjun.verma@example.com',
      age: 42,
      gender: 'Male',
      specialty: 'retina',
      doctorId: doctors[2]._id,
      doctorName: doctors[2].name,
      isSurgeryPatient: false,
      tokenNumber: 3,
      status: 'waiting',
      languagePreference: 'English'
    },
    {
      name: 'Deepika Singh',
      phone: '9876543213',
      email: 'deepika.singh@example.com',
      age: 28,
      gender: 'Female',
      specialty: 'lasik',
      doctorId: doctors[3]._id,
      doctorName: doctors[3].name,
      isSurgeryPatient: true,
      tokenNumber: 4,
      status: 'waiting',
      languagePreference: 'English'
    },
    {
      name: 'Manish Gupta',
      phone: '9876543214',
      email: 'manish.gupta@example.com',
      age: 50,
      gender: 'Male',
      specialty: 'general',
      doctorId: doctors[4]._id,
      doctorName: doctors[4].name,
      isSurgeryPatient: false,
      tokenNumber: 5,
      status: 'waiting',
      languagePreference: 'English'
    },
    {
      name: 'Anjali Joshi',
      phone: '9876543215',
      email: 'anjali.joshi@example.com',
      age: 35,
      gender: 'Female',
      specialty: 'cataract',
      doctorId: doctors[0]._id,
      doctorName: doctors[0].name,
      isSurgeryPatient: true,
      tokenNumber: 6,
      status: 'completed',
      languagePreference: 'Marathi'
    },
    {
      name: 'Rohan Kapoor',
      phone: '9876543216',
      email: 'rohan.kapoor@example.com',
      age: 38,
      gender: 'Male',
      specialty: 'general',
      doctorId: doctors[4]._id,
      doctorName: doctors[4].name,
      isSurgeryPatient: false,
      tokenNumber: 7,
      status: 'waiting',
      languagePreference: 'English'
    },
    {
      name: 'Sneha Murthy',
      phone: '9876543217',
      email: 'sneha.murthy@example.com',
      age: 32,
      gender: 'Female',
      specialty: 'retina',
      doctorId: doctors[2]._id,
      doctorName: doctors[2].name,
      isSurgeryPatient: false,
      tokenNumber: 8,
      status: 'in-consultation',
      languagePreference: 'English'
    },
    {
      name: 'Vikram Bhat',
      phone: '9876543218',
      email: 'vikram.bhat@example.com',
      age: 60,
      gender: 'Male',
      specialty: 'glaucoma',
      doctorId: doctors[1]._id,
      doctorName: doctors[1].name,
      isSurgeryPatient: false,
      tokenNumber: 9,
      status: 'waiting',
      languagePreference: 'English'
    },
    {
      name: 'Nisha Reddy',
      phone: '9876543219',
      email: 'nisha.reddy@example.com',
      age: 26,
      gender: 'Female',
      specialty: 'lasik',
      doctorId: doctors[3]._id,
      doctorName: doctors[3].name,
      isSurgeryPatient: true,
      tokenNumber: 10,
      status: 'waiting',
      languagePreference: 'English'
    }
  ];

  try {
    const createdPatients = await Patient.insertMany(patientsData);
    console.log(`✅ ${createdPatients.length} patients seeded successfully`);
    return createdPatients;
  } catch (err) {
    console.error('❌ Error seeding patients:', err.message);
    throw err;
  }
}

// ─── Seed Appointments ────────────────────────────────────────────────────────
async function seedAppointments(doctors, patients) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const appointmentsData = [
    {
      patientId: patients[0]._id,
      doctorId: doctors[0]._id,
      appointmentDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
      appointmentTime: '10:00',
      status: 'scheduled',
      type: 'consultation',
      tokenNumber: 1,
      notes: 'First consultation for cataract evaluation'
    },
    {
      patientId: patients[1]._id,
      doctorId: doctors[1]._id,
      appointmentDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
      appointmentTime: '10:30',
      status: 'confirmed',
      type: 'consultation',
      tokenNumber: 2,
      notes: 'Glaucoma pressure check'
    },
    {
      patientId: patients[2]._id,
      doctorId: doctors[2]._id,
      appointmentDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
      appointmentTime: '11:00',
      status: 'scheduled',
      type: 'follow-up',
      tokenNumber: 1,
      notes: 'Retina follow-up examination'
    },
    {
      patientId: patients[3]._id,
      doctorId: doctors[3]._id,
      appointmentDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
      appointmentTime: '09:30',
      status: 'scheduled',
      type: 'consultation',
      tokenNumber: 1,
      notes: 'LASIK pre-operative assessment'
    },
    {
      patientId: patients[4]._id,
      doctorId: doctors[4]._id,
      appointmentDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
      appointmentTime: '15:30',
      status: 'scheduled',
      type: 'consultation',
      tokenNumber: 3,
      notes: 'General eye examination'
    },
    {
      patientId: patients[5]._id,
      doctorId: doctors[0]._id,
      appointmentDate: new Date(today.getTime() + 0 * 24 * 60 * 60 * 1000),
      appointmentTime: '14:00',
      status: 'completed',
      type: 'surgery',
      tokenNumber: 5,
      checkInTime: new Date(today.getTime() + 0 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      waitTime: 15,
      notes: 'Cataract surgery completed successfully'
    },
    {
      patientId: patients[6]._id,
      doctorId: doctors[4]._id,
      appointmentDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
      appointmentTime: '16:00',
      status: 'scheduled',
      type: 'consultation',
      tokenNumber: 2,
      notes: 'Routine check-up'
    },
    {
      patientId: patients[7]._id,
      doctorId: doctors[2]._id,
      appointmentDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000),
      appointmentTime: '08:00',
      status: 'scheduled',
      type: 'follow-up',
      tokenNumber: 1,
      notes: 'OCT imaging for retina assessment'
    },
    {
      patientId: patients[8]._id,
      doctorId: doctors[1]._id,
      appointmentDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
      appointmentTime: '11:30',
      status: 'scheduled',
      type: 'consultation',
      tokenNumber: 3,
      notes: 'Regular glaucoma monitoring'
    },
    {
      patientId: patients[9]._id,
      doctorId: doctors[3]._id,
      appointmentDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
      appointmentTime: '10:00',
      status: 'scheduled',
      type: 'surgery',
      tokenNumber: 1,
      notes: 'LASIK eye surgery scheduled'
    }
  ];

  try {
    const createdAppointments = await Appointment.insertMany(appointmentsData);
    console.log(`✅ ${createdAppointments.length} appointments seeded successfully`);
    return createdAppointments;
  } catch (err) {
    console.error('❌ Error seeding appointments:', err.message);
    throw err;
  }
}

// ─── Main Seed Function ────────────────────────────────────────────────────────
async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');
  
  try {
    await connectDB();
    await clearDatabase();
    
    const doctors = await seedDoctors();
    const patients = await seedPatients(doctors);
    await seedAppointments(doctors, patients);

    console.log('\n✅ Database seeding completed successfully!');
    
    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log(`   • Doctors: ${doctors.length}`);
    console.log(`   • Patients: ${patients.length}`);
    console.log('   • Appointments: 10');
    
  } catch (err) {
    console.error('\n❌ Seeding failed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
  }
}

// Run the seeding script
seedDatabase();
