import React from "react";

const EditStaffProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-8">
        <button className="text-blue-500 text-sm mb-4 hover:underline">&larr; Back</button>
        <h2 className="text-2xl font-semibold mb-1">Edit Staff</h2>
        <p className="text-gray-500 mb-6">Profile</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upload Photo Section */}
          <div className="flex flex-col items-center border rounded-lg p-6">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center bg-gray-100">
              <img
                src="https://via.placeholder.com/150" // Replace with actual avatar
                alt="Staff"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="text-sm text-blue-600 mt-2 hover:underline">Update Photo</button>
            <p className="text-sm text-gray-400 mt-4">Allowed format: JPG, JPEG, and PNG</p>
            <p className="text-sm text-gray-400">Max file size: 2MB</p>
          </div>

          {/* Form Section */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value="0221AD"
              readOnly
              className="border p-2 rounded bg-gray-100"
              placeholder="User ID"
            />
            <div></div>

            <input type="text" placeholder="Enter first name" className="border p-2 rounded" />
            <input type="text" placeholder="Enter last name" className="border p-2 rounded" />

            <input type="email" placeholder="Enter email address" className="border p-2 rounded" />
            <input type="tel" placeholder="Enter phone number" className="border p-2 rounded" />

            <select className="border p-2 rounded text-gray-500">
              <option disabled selected>Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input type="date" placeholder="Enter date of birth" className="border p-2 rounded" />

            <input type="date" placeholder="Enter hire date" className="border p-2 rounded" />
            <select className="border p-2 rounded text-gray-500">
              <option disabled selected>Select designation</option>
              <option>HR</option>
              <option>Engineering</option>
              <option>Finance</option>
            </select>

            <select className="border p-2 rounded text-gray-500">
              <option disabled selected>Select role</option>
              <option>Manager</option>
              <option>Supervisor</option>
              <option>Staff</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center md:justify-end gap-4 mt-8">
          <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded shadow hover:from-sky-600">
            Edit Profile
          </button>
          <button className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white px-6 py-2 rounded shadow hover:from-cyan-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStaffProfile;
