import { useState, useEffect } from "react";

const EditSalary = () => {
  // State for form data
  const [formData, setFormData] = useState({
    fullName: "",
    department: "",
    baseSalary: "",
    salaryMonth: "",
    deductions: "",
    bonus: "",
    nextSalary: ""
  });

  // State for showing success message
  const [showSuccess, setShowSuccess] = useState(false);
  // State for animation when values change
  const [highlight, setHighlight] = useState({
    deductions: false,
    bonus: false,
    nextSalary: false
  });

  // Function to handle input changes - only allow editing of specific fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // Only allow editing deductions and bonus
    if (["deductions", "bonus"].includes(id)) {
      setFormData({
        ...formData,
        [id]: value
      });
      
      // Add highlighting effect
      setHighlight(prev => ({ ...prev, [id]: true }));
      setTimeout(() => setHighlight(prev => ({ ...prev, [id]: false })), 2000);
      
      // Calculate next salary
      calculateNextSalary({
        ...formData,
        [id]: value
      });
    }
  };

  // Function to calculate next salary
  const calculateNextSalary = (data) => {
    const base = parseFloat(data.baseSalary) || 0;
    const deductions = parseFloat(data.deductions) || 0;
    const bonus = parseFloat(data.bonus) || 0;
    
    const nextSalary = base - deductions + bonus;
    
    setFormData(prev => ({
      ...prev,
      nextSalary: nextSalary > 0 ? nextSalary.toFixed(2) : ""
    }));
    
    // Highlight the next salary field when it changes
    setHighlight(prev => ({ ...prev, nextSalary: true }));
    setTimeout(() => setHighlight(prev => ({ ...prev, nextSalary: false })), 2000);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Here you would typically send data to your API
    console.log("Submitting updated payroll data:", formData);
    
    // Show success message
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Simulate receiving HR data updates
  useEffect(() => {
    // This would typically be an API call to fetch employee data from HR
    const fetchEmployeeData = async () => {
      // Simulating API response
      const hrData = {
        fullName: "Nguyễn Văn A",
        department: "IT Department",
        baseSalary: "15000000.00",
        salaryMonth: "May 2025",
        deductions: "1500000.00",
        bonus: "2000000.00"
      };
      
      const nextSalaryValue = (
        parseFloat(hrData.baseSalary) - 
        parseFloat(hrData.deductions) + 
        parseFloat(hrData.bonus)
      ).toFixed(2);
      
      setFormData({
        ...hrData,
        nextSalary: nextSalaryValue
      });
    };
    
    fetchEmployeeData();
  }, []);

  // Get input style based on whether field is editable and highlighted
  const getInputStyle = (id) => {
    const baseStyle = "w-full rounded-md border text-xs py-2 px-3 focus:outline-none";
    
    // Non-editable fields
    if (!["deductions", "bonus"].includes(id)) {
      return `${baseStyle} border-gray-200 bg-gray-50 text-gray-500`;
    }
    
    // Editable fields with highlight effect
    if (highlight[id]) {
      return `${baseStyle} border-green-500 bg-green-50 text-gray-800 focus:ring-1 focus:ring-green-500 transition-all duration-200`;
    }
    
    // Editable fields normal state
    return `${baseStyle} border-blue-300 text-gray-800 focus:ring-1 focus:ring-blue-500`;
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-6xl flex flex-col">
        <buttom className="flex items-center text-blue-600 text-sm font-medium mb-4 cursor-pointer hover:text-blue-700 transition-colors self-start"
        
          onClick={() => window.history.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </buttom>

        {showSuccess && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-sm animate-fadeIn">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <p className="text-sm font-medium">Payroll information updated successfully!</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 w-full border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-800 font-semibold text-lg">Edit Salary</h2>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">HR Update</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                readOnly
                className={getInputStyle("fullName")}
              />
              <p className="text-xs text-gray-400 mt-1">From HR records</p>
            </div>
            <div>
              <label htmlFor="department" className="block text-xs font-semibold text-gray-700 mb-1">Department</label>
              <input
                id="department"
                type="text"
                value={formData.department}
                readOnly
                className={getInputStyle("department")}
              />
              <p className="text-xs text-gray-400 mt-1">From HR records</p>
            </div>

            <div>
              <label htmlFor="baseSalary" className="block text-xs font-semibold text-gray-700 mb-1">Base Salary (₫)</label>
              <input
                id="baseSalary"
                type="text"
                value={new Intl.NumberFormat('vi-VN').format(parseFloat(formData.baseSalary)) + " ₫"}
                readOnly
                className={getInputStyle("baseSalary")}
              />
              <p className="text-xs text-gray-400 mt-1">From HR records</p>
            </div>
            <div>
              <label htmlFor="salaryMonth" className="block text-xs font-semibold text-gray-700 mb-1">Salary Month</label>
              <input
                id="salaryMonth"
                type="text"
                value={formData.salaryMonth}
                readOnly
                className={getInputStyle("salaryMonth")}
              />
              <p className="text-xs text-gray-400 mt-1">From HR records</p>
            </div>

            <div>
              <label htmlFor="deductions" className="block text-xs font-semibold text-gray-700 mb-1 flex items-center">
                Deductions (₫)
                <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">Editable</span>
              </label>
              <input
                id="deductions"
                type="number"
                value={formData.deductions}
                onChange={handleChange}
                placeholder="Enter amount in VND"
                className={getInputStyle("deductions")}
              />
              <p className="text-xs text-gray-500 mt-1">Enter amount without formatting</p>
            </div>
            <div>
              <label htmlFor="bonus" className="block text-xs font-semibold text-gray-700 mb-1 flex items-center">
                Bonus (₫)
                <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">Editable</span>
              </label>
              <input
                id="bonus"
                type="number"
                value={formData.bonus}
                onChange={handleChange}
                placeholder="Enter amount in VND"
                className={getInputStyle("bonus")}
              />
              <p className="text-xs text-gray-500 mt-1">Enter amount without formatting</p>
            </div>

            <div>
              <label htmlFor="nextSalary" className="block text-xs font-semibold text-gray-700 mb-1">Final Salary (₫)</label>
              <input
                id="nextSalary"
                type="text"
                value={new Intl.NumberFormat('vi-VN').format(parseFloat(formData.nextSalary)) + " ₫"}
                readOnly
                className={highlight.nextSalary 
                  ? "w-full rounded-md border border-green-500 bg-green-50 text-gray-800 text-xs py-2 px-3 transition-all duration-500" 
                  : "w-full rounded-md border border-gray-200 bg-gray-50 text-gray-800 text-xs py-2 px-3"}
              />
              <p className="text-xs text-gray-500 mt-1">Calculated automatically</p>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSubmit}
                className="w-full py-2.5 text-sm text-white rounded-md bg-blue-600 hover:bg-blue-700 font-medium shadow-sm hover:shadow transition-all"
              >
                Update Payroll
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSalary;