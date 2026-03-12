// ========== DOCTORS ==========
export const doctors = [
  { id: 1, name: "Dr. Aarav Sharma", specialty: "Clinical Psychologist", hospital: "Fortis Hospital", location: "Mumbai", rating: 4.9, reviews: 127, experience: 12, fee: 800, available: true, image: null, qualification: "PhD Psychology, AIIMS Delhi", bio: "Specializing in cognitive behavioral therapy and anxiety disorders with over 12 years of experience.", slots: ["9:00 AM", "10:00 AM", "2:00 PM", "4:00 PM"] },
  { id: 2, name: "Dr. Meera Iyer", specialty: "Psychiatrist", hospital: "Apollo Hospital", location: "Chennai", rating: 4.8, reviews: 98, experience: 15, fee: 1200, available: true, image: null, qualification: "MD Psychiatry, NIMHANS Bangalore", bio: "Expert in mood disorders, PTSD, and medication management.", slots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
  { id: 3, name: "Dr. Riya Patel", specialty: "Therapist", hospital: "Max Healthcare", location: "Delhi", rating: 4.7, reviews: 85, experience: 8, fee: 650, available: true, image: null, qualification: "MSc Clinical Psychology, Tata Institute", bio: "Focused on family therapy, relationship counseling, and stress management.", slots: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"] },
  { id: 4, name: "Dr. Arjun Reddy", specialty: "Neurologist", hospital: "KIMS Hospital", location: "Hyderabad", rating: 4.6, reviews: 72, experience: 20, fee: 1500, available: false, image: null, qualification: "MD Neurology, CMC Vellore", bio: "Specializing in neurological disorders, migraines, and brain health.", slots: ["10:00 AM", "2:00 PM"] },
  { id: 5, name: "Dr. Ananya Gupta", specialty: "Counselor", hospital: "Medanta Hospital", location: "Gurugram", rating: 4.9, reviews: 156, experience: 10, fee: 550, available: true, image: null, qualification: "MA Counseling, JNU Delhi", bio: "Passionate about adolescent mental health and career counseling.", slots: ["8:00 AM", "10:00 AM", "1:00 PM", "4:00 PM"] },
  { id: 6, name: "Dr. Vikram Singh", specialty: "Psychiatrist", hospital: "Fortis Hospital", location: "Mumbai", rating: 4.5, reviews: 63, experience: 7, fee: 1000, available: true, image: null, qualification: "MD Psychiatry, KEM Mumbai", bio: "Focused on anxiety disorders, OCD, and psychopharmacology.", slots: ["9:00 AM", "12:00 PM", "3:00 PM"] },
  { id: 7, name: "Dr. Kavitha Nair", specialty: "Clinical Psychologist", hospital: "Apollo Hospital", location: "Bangalore", rating: 4.8, reviews: 110, experience: 14, fee: 900, available: true, image: null, qualification: "PsyD, NIMHANS Bangalore", bio: "Expert in trauma therapy, EMDR, and complex PTSD treatment.", slots: ["10:00 AM", "1:00 PM", "4:00 PM"] },
  { id: 8, name: "Dr. Rajesh Kapoor", specialty: "Cardiologist", hospital: "Narayana Health", location: "Bangalore", rating: 4.7, reviews: 89, experience: 18, fee: 1300, available: true, image: null, qualification: "MD Cardiology, AIIMS Delhi", bio: "Specialist in preventive cardiology and heart disease management.", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
  { id: 9, name: "Dr. Priya Deshmukh", specialty: "Dermatologist", hospital: "Kokilaben Hospital", location: "Mumbai", rating: 4.6, reviews: 76, experience: 9, fee: 950, available: true, image: null, qualification: "MD Dermatology, Grant Medical College", bio: "Expert in cosmetic dermatology, acne treatment, and skin cancer screening.", slots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
  { id: 10, name: "Dr. Suresh Menon", specialty: "Orthopedist", hospital: "Manipal Hospital", location: "Pune", rating: 4.8, reviews: 102, experience: 16, fee: 1400, available: false, image: null, qualification: "MD Orthopedics, Armed Forces Medical College", bio: "Specializing in sports medicine, joint replacement, and rehabilitation.", slots: ["9:00 AM", "2:00 PM"] },
  { id: 11, name: "Dr. Divya Krishnan", specialty: "Pediatrician", hospital: "Rainbow Children's Hospital", location: "Hyderabad", rating: 4.9, reviews: 134, experience: 11, fee: 700, available: true, image: null, qualification: "MD Pediatrics, Osmania Medical College", bio: "Dedicated to child health, developmental assessments, and family wellness.", slots: ["8:00 AM", "10:00 AM", "1:00 PM", "4:00 PM"] },
  { id: 12, name: "Dr. Amit Chatterjee", specialty: "Therapist", hospital: "Max Healthcare", location: "Kolkata", rating: 4.5, reviews: 58, experience: 6, fee: 600, available: true, image: null, qualification: "MSc Psychology, Calcutta University", bio: "Focused on mindfulness-based therapy and workplace stress.", slots: ["11:00 AM", "2:00 PM", "5:00 PM"] },
];

// ========== HOSPITALS ==========
export const hospitals = [
  { id: 1, name: "Fortis Hospital", location: "Mumbai, Maharashtra", rating: 4.8, reviews: 342, image: null, departments: ["Psychiatry", "Psychology", "Neurology", "Counseling"], doctorCount: 45, description: "A premier healthcare facility offering comprehensive psychiatric, psychological, and multi-specialty care across India.", contact: "+91 22 6265 6000", established: 2005 },
  { id: 2, name: "Apollo Hospital", location: "Chennai, Tamil Nadu", rating: 4.7, reviews: 218, image: null, departments: ["Psychiatry", "Therapy", "Rehabilitation", "Cardiology"], doctorCount: 55, description: "One of India's largest hospital chains delivering world-class healthcare with a focus on mental and physical wellness.", contact: "+91 44 2829 6000", established: 1983 },
  { id: 3, name: "Max Healthcare", location: "Delhi NCR", rating: 4.6, reviews: 189, image: null, departments: ["Therapy", "Counseling", "Wellness Programs", "Neurology"], doctorCount: 40, description: "Modern healthcare institution focused on therapy, counseling, and preventive mental healthcare in North India.", contact: "+91 11 2651 5050", established: 2000 },
  { id: 4, name: "Narayana Health", location: "Bangalore, Karnataka", rating: 4.9, reviews: 412, image: null, departments: ["Cardiology", "Internal Medicine", "Emergency Care", "Pediatrics"], doctorCount: 60, description: "Leading cardiac care facility with state-of-the-art diagnostic and surgical capabilities, founded by Dr. Devi Shetty.", contact: "+91 80 7122 2222", established: 2001 },
  { id: 5, name: "Medanta Hospital", location: "Gurugram, Haryana", rating: 4.5, reviews: 156, image: null, departments: ["Counseling", "Family Therapy", "Youth Services", "Psychiatry"], doctorCount: 35, description: "Multi-specialty medicity offering affordable counseling and family therapy services with cutting-edge infrastructure.", contact: "+91 124 414 1414", established: 2009 },
  { id: 6, name: "Rainbow Children's Hospital", location: "Hyderabad, Telangana", rating: 4.8, reviews: 287, image: null, departments: ["Pediatrics", "Child Psychology", "Neonatology"], doctorCount: 30, description: "Specialized children's hospital providing comprehensive pediatric care across South India.", contact: "+91 40 2355 0055", established: 1999 },
];

// ========== SPECIALTIES ==========
export const specialties = [
  { name: "Psychology", icon: "brain", count: 48, color: "#6C63FF" },
  { name: "Psychiatry", icon: "stethoscope", count: 35, color: "#8B5CF6" },
  { name: "Cardiology", icon: "heart", count: 28, color: "#EC4899" },
  { name: "Neurology", icon: "zap", count: 22, color: "#F59E0B" },
  { name: "Dermatology", icon: "sun", count: 18, color: "#10B981" },
  { name: "Pediatrics", icon: "baby", count: 32, color: "#3B82F6" },
  { name: "Orthopedics", icon: "bone", count: 15, color: "#EF4444" },
  { name: "Therapy", icon: "message-circle", count: 42, color: "#14B8A6" },
];

// ========== REVIEWS ==========
export const sampleReviews = [
  { id: 1, doctorId: 1, userName: "Sneha Joshi", rating: 5, comment: "Dr. Sharma is incredibly empathetic and professional. He helped me overcome my anxiety with practical techniques.", date: "2026-02-15" },
  { id: 2, doctorId: 1, userName: "Rahul Verma", rating: 5, comment: "Best psychologist I have ever visited. Highly recommend for anyone struggling with mental health.", date: "2026-01-20" },
  { id: 3, doctorId: 2, userName: "Lakshmi Sundaram", rating: 4, comment: "Dr. Iyer is very knowledgeable. The medication she prescribed has been very effective.", date: "2026-03-01" },
  { id: 4, doctorId: 3, userName: "Karan Malhotra", rating: 5, comment: "Dr. Patel has a wonderful approach to family therapy. Our family dynamics have improved greatly.", date: "2026-02-28" },
  { id: 5, doctorId: 5, userName: "Neha Agarwal", rating: 5, comment: "Dr. Gupta is amazing with teenagers. She really connects with young patients.", date: "2026-03-05" },
  { id: 6, doctorId: 7, userName: "Siddharth Rao", rating: 4, comment: "Very professional and caring. The EMDR sessions have been transformative.", date: "2026-02-10" },
  { id: 7, doctorId: 8, userName: "Pooja Mehta", rating: 5, comment: "Excellent cardiologist. Thorough examination and clear explanations.", date: "2026-01-15" },
  { id: 8, doctorId: 11, userName: "Deepa Krishnamurthy", rating: 5, comment: "Dr. Krishnan is so good with kids. My daughter loves going to her appointments.", date: "2026-03-08" },
];

// ========== TESTIMONIALS ==========
export const testimonials = [
  { name: "Aditi Saxena", role: "Patient", text: "This platform made finding the right therapist so easy. The search filters and doctor profiles gave me all the information I needed to make an informed decision.", rating: 5 },
  { name: "Rohan Bhatia", role: "Patient", text: "The messaging feature is fantastic. I can communicate with my doctor between appointments, which has been incredibly helpful for my recovery journey.", rating: 5 },
  { name: "Fatima Sheikh", role: "Patient", text: "I love the appointment booking system. Being able to see available slots and book instantly saved me so much time. Highly recommend!", rating: 4 },
  { name: "Dr. Sanjay Kumar", role: "Doctor", text: "As a healthcare provider, this platform has streamlined my practice. The patient management tools and messaging system are excellent.", rating: 5 },
];

// ========== MEDICINES (PHARMACY) ==========
export const medicines = [
  { id: 1, name: "Calm Relief Capsules", category: "Anxiety", price: 249, description: "Natural supplement for anxiety relief and relaxation.", inStock: true },
  { id: 2, name: "MindEase Tablets", category: "Depression", price: 349, description: "Supports mood balance and emotional wellbeing.", inStock: true },
  { id: 3, name: "SleepWell Plus", category: "Sleep", price: 199, description: "Melatonin-based supplement for better sleep quality.", inStock: true },
  { id: 4, name: "FocusPro", category: "Focus", price: 299, description: "Enhances concentration and cognitive performance.", inStock: true },
  { id: 5, name: "StressGuard", category: "Stress", price: 229, description: "Adaptogenic herbs for stress management.", inStock: false },
  { id: 6, name: "NeuroCalm", category: "Anxiety", price: 399, description: "Prescription-grade anxiety management supplement.", inStock: true },
  { id: 7, name: "MoodLift Pro", category: "Depression", price: 449, description: "Advanced formula for mood support and balance.", inStock: true },
  { id: 8, name: "VitaMin Brain", category: "Focus", price: 279, description: "Essential vitamins for brain health and clarity.", inStock: true },
  { id: 9, name: "RelaxMax", category: "Sleep", price: 169, description: "Herbal blend for deep, restful sleep.", inStock: true },
  { id: 10, name: "CardioShield", category: "Heart Health", price: 329, description: "Supports cardiovascular health and circulation.", inStock: true },
];

export const pharmacyCategories = ["All", "Anxiety", "Depression", "Sleep", "Focus", "Stress", "Heart Health"];

// ========== HOW IT WORKS ==========
export const howItWorks = [
  { step: 1, title: "Search a Doctor", description: "Find the right specialist by searching through our comprehensive database of verified healthcare providers." },
  { step: 2, title: "Check Doctor Profile", description: "Review their qualifications, experience, patient reviews, and available appointment slots." },
  { step: 3, title: "Book Appointment", description: "Select a convenient time slot and book your appointment instantly with secure payment." },
  { step: 4, title: "Get Consultation", description: "Attend your consultation in person or via secure video call from the comfort of your home." },
];
