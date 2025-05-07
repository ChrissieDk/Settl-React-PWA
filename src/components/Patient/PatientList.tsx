import React, { useState, useEffect } from "react";
import PatientDetail from "./PatientDetails";
import PatientBlock from "./PatientBlock";
import { fetchMerchantUsers } from "../../Services/data.service";

// Define the type for your actual data structure from the API
interface User {
  id: string;
  emailAddress: string;
  username: string;
  lastTransactionDate: string;
  amount: number;
}

const PatientsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchMerchantUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError("Failed to load users. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleViewDetails = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedPatient(user);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Optional: delay the resetting of selectedPatient to avoid visual glitches
    setTimeout(() => setSelectedPatient(null), 300);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="w-full p-4">Loading users...</div>;
  }

  if (error) {
    return <div className="w-full p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
        {filteredUsers.map((user) => (
          <PatientBlock
            key={user.id}
            patient={user} // Pass the entire user object directly
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <PatientDetail
          isOpen={isModalOpen}
          onClose={closeModal}
          patient={selectedPatient} // Pass the entire selected patient object
        />
      )}
    </div>
  );
};

export default PatientsList;
