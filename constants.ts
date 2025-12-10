import { Doctor } from './types';

export const SPECIALTIES = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedist",
  "Pediatrician",
  "General Physician",
  "Vascular Surgeon",
  "Proctologist"
];

export const LOCATIONS = [
  "Pune, MH",
  "Mumbai, MH",
  "Delhi, NCR",
  "Bangalore, KA",
  "Hyderabad, TS",
  "Chennai, TN",
  "Kolkata, WB"
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Dr. Anjali Desai",
    specialty: "Vascular Surgeon",
    location: "Pune, MH",
    experience: 12,
    rating: 4.8,
    reviewCount: 124,
    image: "https://picsum.photos/id/64/300/300",
    about: "Dr. Desai specializes in minimally invasive treatments for varicose veins and spider veins. With over a decade of experience, she is a leading vascular specialist in Pune.",
    consultationFee: 1500,
    availability: ["Mon", "Tue", "Thu", "Fri"],
    hospitalAffiliation: "Avish Vascular Institute"
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialty: "Cardiologist",
    location: "Mumbai, MH",
    experience: 20,
    rating: 4.9,
    reviewCount: 310,
    image: "https://picsum.photos/id/91/300/300",
    about: "Dr. Kumar is a board-certified cardiologist focusing on preventative cardiology and heart failure management. He is affiliated with Apollo Hospitals.",
    consultationFee: 2000,
    availability: ["Mon", "Wed", "Fri"],
    hospitalAffiliation: "Apollo Heart Center"
  },
  {
    id: "3",
    name: "Dr. Sarah Lee",
    specialty: "Dermatologist",
    location: "Bangalore, KA",
    experience: 8,
    rating: 4.7,
    reviewCount: 89,
    image: "https://picsum.photos/id/65/300/300",
    about: "Expert in cosmetic and medical dermatology. Dr. Lee provides comprehensive skin care solutions ranging from acne treatment to laser therapies.",
    consultationFee: 1200,
    availability: ["Tue", "Thu", "Sat"],
    hospitalAffiliation: "Bangalore Skin Clinic"
  },
  {
    id: "4",
    name: "Dr. Vikram Patel",
    specialty: "Proctologist",
    location: "Pune, MH",
    experience: 15,
    rating: 4.6,
    reviewCount: 205,
    image: "https://picsum.photos/id/1005/300/300",
    about: "Specializing in laser treatments for piles, fissures, and fistulas. Dr. Patel ensures a pain-free and quick recovery process.",
    consultationFee: 1000,
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    hospitalAffiliation: "Hexa Health Partner Clinic"
  },
  {
    id: "5",
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    location: "Delhi, NCR",
    experience: 10,
    rating: 4.9,
    reviewCount: 150,
    image: "https://picsum.photos/id/342/300/300",
    about: "Dedicated to the health and well-being of children from infancy through adolescence. Compassionate care is her hallmark.",
    consultationFee: 800,
    availability: ["Mon", "Wed", "Sat"],
    hospitalAffiliation: "Max Super Speciality Hospital"
  },
  {
    id: "6",
    name: "Dr. James Wilson",
    specialty: "Orthopedist",
    location: "Hyderabad, TS",
    experience: 25,
    rating: 4.5,
    reviewCount: 400,
    image: "https://picsum.photos/id/203/300/300",
    about: "Senior orthopedic surgeon specializing in joint replacement and sports injuries. Internationally trained specialist.",
    consultationFee: 2500,
    availability: ["Tue", "Thu"],
    hospitalAffiliation: "KIMS Hospitals"
  }
];