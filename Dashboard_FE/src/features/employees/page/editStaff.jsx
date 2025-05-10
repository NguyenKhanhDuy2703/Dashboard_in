import { useEffect, useState } from "react";
import { getAllDepartmentAndJobs } from "../../../services/department.server";
import FloatingLoader from "../../../components/common/loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateEmployee, getEmployeeById  } from "../../../services/employee.sevices";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';
const EditStaffProfile = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [employeeId , setEmployeeId] = useState(id);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [dataDAJ, setDataDAJ] = useState({});
  const [status, setStatus] = useState("");
  // check if all fields are filled
  const validateForm = () => {
  
    const today = new Date();
    const birthDate = new Date(dob);
    const hireDateObj = new Date(hireDate);

    // So sánh ngày sinh với hiện tại
    if (birthDate.toDateString() === today.toDateString()) {
      toast.error("Date of birth cannot be today's date.");
      return false;
    }

    // Phải nhỏ hơn ngày vào làm
    if (birthDate >= hireDateObj) {
      toast.error("Date of birth must be before hire date.");
      return false;
    }

    // Nhân viên phải lớn hơn 18 tuổi
    const age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear = (
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
    );

    const actualAge = hasHadBirthdayThisYear ? age : age - 1;

    if (actualAge < 18) {
      toast.error("Staff member must be at least 18 years old.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const formData = {
      EmployeeID: id,
      FullName: `${firstName} ${lastName}`,
      Email: email,
      PhoneNumber: phone,
      Gender: gender,
      DateOfBirth: dob,
      HireDate: hireDate,
      DepartmentID: department,
      PositionID: position,
      Status: status,
    };
    console.log(formData);
    const updateStaff = async () => {
      try {
        const res = await updateEmployee(formData);
        console.log(res);
        if (res.status === 200) {
          toast.success("Staff member updated successfully!");
        }
      } catch (error) {
        console.error("Error updating staff:", error);
        toast.error("Failed to update staff member.");
      }
    };
    
    updateStaff();
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch departments and positions
        const departmentsAndJobs = await getAllDepartmentAndJobs();
        setDataDAJ(departmentsAndJobs);
        
        // Fetch employee data
        const res = await getEmployeeById(id);
        const employeeData = res.data.data[0];
        console.log(employeeData);
       
        // Split full name into first name and last name
        const nameParts = employeeData.FullName.split(' ');
  
        
        setFirstName(nameParts[0] + " " + nameParts[1]);
        setLastName(nameParts[2]);
        setEmail(employeeData.Email);
        setPhone(employeeData.PhoneNumber);
        setGender(employeeData.Gender);
        setDob(dayjs(employeeData.DateOfBirth).format("YYYY-MM-DD"));
        setHireDate(dayjs(employeeData.HireDate).format("YYYY-MM-DD"));
        setDepartment(employeeData.DepartmentID);
        setPosition(employeeData.PositionID);
        setStatus(employeeData.Status);

        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load employee data.");
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (isLoading || !dataDAJ?.departments || !dataDAJ?.positions) {
    return <FloatingLoader />;
  }

  return (
    <>
      <div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
      <div className="">
        <button className="flex items-center text-gray-600 hover:text-blue-500" onClick={() => window.history.back()}>
          <IoArrowBackOutline className="mr-2" size={20} />
          <span className="text-sm">Back</span>
        </button>
      </div>
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Staff Profile</h2>
        <p className="text-gray-500 mb-6 text-center">Update the staff details below.</p>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Staff ID (Read-Only) */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Staff ID</label>
              <input
                type="text"
                value={employeeId}
                readOnly
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100"
                placeholder="Staff ID"
              />
            </div>

            {/* Editable Fields */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Last Name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email Address"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Phone Number"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled >Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Hire Date</label>
              <input
                type="date"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"    
              >
                <option value="" disabled>Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Position</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>Select Position</option>
                {dataDAJ?.positions.map((pos) => (
                  <option key={pos.PositionID} value={pos.PositionID}>
                    {pos.PositionName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>Select Department</option>
                {dataDAJ?.departments.map((dept) => (
                  <option key={dept.DepartmentID} value={dept.DepartmentID}>
                    {dept.DepartmentName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8">
            <button
              type="button"
              className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-medium px-8 py-3 rounded-xl shadow-md hover:from-gray-500 hover:to-gray-600 transition mr-4"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-8 py-3 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditStaffProfile;