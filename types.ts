export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  experience: number; // in years
  rating: number;
  reviewCount: number;
  image: string;
  about: string;
  consultationFee: number;
  availability: string[]; // e.g., ["Mon", "Wed", "Fri"]
  hospitalAffiliation: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  reason: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}