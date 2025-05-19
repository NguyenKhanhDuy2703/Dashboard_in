import { useEffect, useState } from "react";
import { getAllDepartmentAndJobs } from "../../../services/department.server";
import FloatingLoader from "../../../components/common/loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addNewEmployee} from "../../../services/employee.sevices"
import { IoArrowBackOutline } from "react-icons/io5";
import featureRoles from "../../../utils/permissionRole";
import { useSelector } from "react-redux";
const AddStaffForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [department, setDepartment] = useState("");
  const [postion, setPosition] = useState("");
  const [dataDAJ, setDataDAJ] = useState({});

  // check if all fields are filled
const validateForm = () => {
  if (
    !firstName || !lastName || !email || !phone ||
    !gender || !dob || !hireDate || !department || !postion
  ) {
    toast.error("Please fill in all fields.");
    return false;
  }

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
      FullName: `${firstName} ${lastName}`,
      Email: email,
      PhoneNumber: phone,
      Gender: gender,
      DateOfBirth: dob,
      HireDate: hireDate,
      DepartmentID: department,
      PositionID: postion,
    };
    console.log("Submitted data:", formData);
    const addNewStaff = async () => {
      try {
        const res = await addNewEmployee(formData);
        if (res.status === 200) {
          toast.success("Staff member added successfully!");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setGender("");
          setDob("");
          setHireDate("");
          setDepartment("");
          setPosition("");
        }
      } catch (error) {
        console.error("Error adding new staff:", error);
        toast.error("Failed to add staff member. Please try again.");
        
      }
    }
    addNewStaff();
  };

  useEffect ( () => {
    const fetchDepartmentAndJobs = async () => {
      try {
        const dataDAJ = await getAllDepartmentAndJobs();
        setDataDAJ(dataDAJ);
      } catch (error) {
        console.error("Error fetching department and jobs:", error);
      }
    };
    fetchDepartmentAndJobs();
  } ,[])
    //check role
  const {user} = useSelector((state) => state);
   if(featureRoles.human.add.includes(user.role) === false)  {
    return (
      <AccessDeniedPage />
    );
  }
  if(!dataDAJ?.departments || !dataDAJ?.positions) {
    return (
      <FloatingLoader />
    );
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
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Add New Staff Member
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
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
          <label className="block mb-2 text-sm font-medium text-gray-700">Position</label>
          <select
            value={postion}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>Select Position</option>
            {
              dataDAJ?.positions.map((postion) => {
                return (
                  <option key={postion.PositionID} value={postion.PositionID}>{postion.PositionName}</option>
                )
              })
            }
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
            {
              dataDAJ?.departments.map((department) => {
                return (
                  <option key={department.DepartmentID} value={department.DepartmentID}>{department.DepartmentName}</option>
                )
              })
            }
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-8 py-3 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition"
        >
          Add Staff
        </button>
      </div>
    </form>
    </>
  );
};

export default AddStaffForm;
