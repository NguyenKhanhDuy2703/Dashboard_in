const AddStaffForm = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Staff Member</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Upload Photo */}
        <div className="flex flex-col items-center border border-gray-200 rounded-xl p-6 bg-gray-50">
          <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-white text-gray-400 cursor-pointer hover:bg-gray-100 transition">
            <span className="text-sm text-center">Upload<br />Photo</span>
          </div>
          <div className="text-center mt-4 text-sm text-gray-500">
            <p>Allowed formats: JPG, JPEG, PNG</p>
            <p>Max size: 2MB</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <input type="text" placeholder="First Name" className="input-style px-1.5 " />
          <input type="text" placeholder="Last Name" className="input-style" />
          <input type="email" placeholder="Email Address" className="input-style" />
          <input type="tel" placeholder="Phone Number" className="input-style" />

          <select className="input-style text-gray-600">
            <option disabled selected>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input type="date" className="input-style" placeholder="Date of Birth" />

          <input type="date" className="input-style" placeholder="Hire Date" />
          <input type="text" placeholder="Department" className="input-style" />

          <select className="input-style text-gray-600">
            <option disabled selected>Select Role</option>
            <option>Manager</option>
            <option>Supervisor</option>
            <option>Staff</option>
          </select>

          <select className="input-style text-gray-600">
            <option disabled selected>Select Designation</option>
            <option>HR</option>
            <option>Engineering</option>
            <option>Finance</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-8 py-3 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition">
          Add Staff
        </button>
      </div>
    </div>
  );
};

export default AddStaffForm;
