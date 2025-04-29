import React, { useState } from "react";
import PatientDetail from "./PatientDetails";
import PatientBlock from "./PatientBlock";

// Extended patient data with transactions
const samplePatients = [
  {
    id: "1",
    name: "Sarah",
    surname: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "(012) 345-6789",
    address: "123 Main St, Anytown, AN 12345",
    lastService: {
      type: "gp",
      date: "15 Apr 2025",
    },
    amount: 120.0,
    transactions: [
      {
        id: "t1",
        date: "15 Apr 2025",
        description: "General consultation",
        amount: 120.0,
        serviceType: "gp",
      },
      {
        id: "t2",
        date: "02 Mar 2025",
        description: "Blood work",
        amount: 85.5,
        serviceType: "gp",
      },
      {
        id: "t3",
        date: "15 Jan 2025",
        description: "Annual checkup",
        amount: 150.75,
        serviceType: "gp",
      },
    ],
  },
  {
    id: "2",
    name: "Michael",
    surname: "Chen",
    email: "michael.chen@example.com",
    phone: "(098) 765-4321",
    lastService: {
      type: "dentist",
      date: "22 Apr 2025",
    },
    amount: 85.5,
    transactions: [
      {
        id: "t4",
        date: "22 Apr 2025",
        description: "Teeth cleaning",
        amount: 85.5,
        serviceType: "dentist",
      },
      {
        id: "t5",
        date: "10 Feb 2025",
        description: "Cavity filling",
        amount: 125.0,
        serviceType: "dentist",
      },
    ],
  },
  {
    id: "3",
    name: "Emma",
    surname: "Rodriguez",
    email: "emma.rodriguez@example.com",
    phone: "(555) 123-4567",
    address: "789 Oak Ave, Westville, WV 67890",
    lastService: {
      type: "gp",
      date: "10 Apr 2025",
    },
    amount: 65.75,
    transactions: [
      {
        id: "t6",
        date: "10 Apr 2025",
        description: "Prescription renewal",
        amount: 65.75,
        serviceType: "gp",
      },
      {
        id: "t7",
        date: "25 Mar 2025",
        description: "Flu shot",
        amount: 45.0,
        serviceType: "gp",
      },
    ],
  },
  {
    id: "4",
    name: "James",
    surname: "Williams",
    email: "james.williams@example.com",
    phone: "(444) 987-6543",
    lastService: {
      type: "dentist",
      date: "18 Apr 2025",
    },
    amount: 95.0,
    transactions: [
      {
        id: "t8",
        date: "18 Apr 2025",
        description: "X-ray and consultation",
        amount: 95.0,
        serviceType: "dentist",
      },
    ],
  },
  {
    id: "5",
    name: "Olivia",
    surname: "Brown",
    email: "olivia.brown@example.com",
    phone: "(333) 222-1111",
    lastService: {
      type: "gp",
      date: "05 Apr 2025",
    },
    amount: 110.25,
    transactions: [
      {
        id: "t9",
        date: "05 Apr 2025",
        description: "Allergy testing",
        amount: 110.25,
        serviceType: "gp",
      },
      {
        id: "t10",
        date: "20 Feb 2025",
        description: "Follow-up visit",
        amount: 75.0,
        serviceType: "gp",
      },
    ],
  },
  {
    id: "6",
    name: "William",
    surname: "Davis",
    email: "william.davis@example.com",
    phone: "(222) 333-4444",
    address: "456 Maple Lane, Centerburg, CB 34567",
    lastService: {
      type: "dentist",
      date: "25 Apr 2025",
    },
    amount: 75.5,
    transactions: [
      {
        id: "t11",
        date: "25 Apr 2025",
        description: "Regular checkup",
        amount: 75.5,
        serviceType: "dentist",
      },
      {
        id: "t12",
        date: "15 Jan 2025",
        description: "Teeth whitening",
        amount: 200.0,
        serviceType: "dentist",
      },
    ],
  },
];

const PatientsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (patientId: string) => {
    const patient = samplePatients.find((p) => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Optional: delay the resetting of selectedPatient to avoid visual glitches
    setTimeout(() => setSelectedPatient(null), 300);
  };

  const filteredPatients = samplePatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.surname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Patients</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Add Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
        {filteredPatients.map((patient) => (
          <PatientBlock
            key={patient.id}
            patient={{
              id: patient.id,
              name: `${patient.name} ${patient.surname}`,
              lastService: patient.lastService,
              amount: patient.amount,
            }}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Patient Detail Modal */}
      <PatientDetail
        isOpen={isModalOpen}
        onClose={closeModal}
        patient={selectedPatient}
      />
    </div>
  );
};

export default PatientsList;
