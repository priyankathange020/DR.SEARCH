import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor, Appointment } from '../types';
import { MOCK_DOCTORS } from '../constants';

interface DataContextType {
  doctors: Doctor[];
  appointments: Appointment[];
  bookAppointment: (appointment: Appointment) => void;
  getDoctorById: (id: string) => Doctor | undefined;
  getAppointmentsByDoctor: (doctorId: string) => Appointment[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [doctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const bookAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
    console.log("New Appointment:", appointment);
  };

  const getDoctorById = (id: string) => {
    return doctors.find((d) => d.id === id);
  };

  const getAppointmentsByDoctor = (doctorId: string) => {
    return appointments.filter(appt => appt.doctorId === doctorId);
  };

  return (
    <DataContext.Provider value={{ doctors, appointments, bookAppointment, getDoctorById, getAppointmentsByDoctor }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};