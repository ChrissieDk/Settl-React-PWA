import React from "react";
import { FaUserCircle, FaPlus } from "react-icons/fa";

// Define types for our data structure
type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cityState: string;
  postalCode: string;
};

// Mock data
const mockUserProfile: UserProfile = {
  firstName: "Christiaan",
  lastName: "de Kock",
  email: "christiaandk96@gmail.com",
  phone: "0767558992",
  cityState: "Cape Town, Western Cape",
  postalCode: "7550",
};
const Beneficiaries: UserProfile = {
  firstName: "Hayley",
  lastName: "Moosa",
  email: "hayley@gmail.com",
  phone: "0767552342",
  cityState: "Cape Town, Western Cape",
  postalCode: "7550",
};

// Edit button component
const EditButton: React.FC = () => (
  <button className="text-blue-500 hover:text-blue-700">
    Edit <span className="ml-1">✏️</span>
  </button>
);

// Add Beneficiary button component
const AddBeneficiaryButton: React.FC = () => (
  <button className="flex items-center text-blue-500 hover:text-blue-700">
    Add Beneficiary <FaPlus className="ml-2" />
  </button>
);

// Main UserProfile component
const UserProfile: React.FC = () => {
  return (
    <div className="flex bg-gray-200 min-h-screen">
      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-header mb-6 text-left text-blue-500">
          My Profile
        </h1>

        {/* Profile header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <FaUserCircle className="w-16 h-16 rounded-full mr-4 text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold text-left">{`${mockUserProfile.firstName} ${mockUserProfile.lastName}`}</h2>
            </div>
          </div>
          <div className="flex items-center px-4 py-2 border border-black rounded-3xl">
            {" "}
            <EditButton />
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-left">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-header">Personal Information</h3>
            <div className="flex items-center px-4 py-2  border border-black rounded-3xl">
              {" "}
              <EditButton />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">First Name</p>
              <p>{mockUserProfile.firstName}</p>
            </div>
            <div>
              <p className="text-gray-600">Last Name</p>
              <p>{mockUserProfile.lastName}</p>
            </div>
            <div>
              <p className="text-gray-600">Email address</p>
              <p>{mockUserProfile.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p>{mockUserProfile.phone}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-left">
          <div className="flex justify-between items-center mb-4 ">
            <h3 className="text-lg font-header">Address</h3>
            <div className="flex items-center px-4 py-2  border border-black rounded-3xl">
              {" "}
              <EditButton />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">City/State</p>
              <p>{mockUserProfile.cityState}</p>
            </div>
            <div>
              <p className="text-gray-600">Postal Code</p>
              <p>{mockUserProfile.postalCode}</p>
            </div>
          </div>
        </div> */}

        {/* Beneficiaries */}
        <div className="bg-white rounded-lg shadow-md p-6 text-left">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-header">Beneficiaries</h3>
            <div className="flex items-center p-3  border border-black rounded-3xl">
              <AddBeneficiaryButton />
              <span className="mx-2">|</span>
              <EditButton />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">First Name</p>
              <p>{Beneficiaries.firstName}</p>
            </div>
            <div>
              <p className="text-gray-600">Last Name</p>
              <p>{Beneficiaries.lastName}</p>
            </div>
            <div>
              <p className="text-gray-600">Email address</p>
              <p>{Beneficiaries.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p>{Beneficiaries.phone}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
