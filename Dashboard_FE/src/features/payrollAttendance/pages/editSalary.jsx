import { useState, useEffect } from "react";
import { getPayrollById , updatePayroll } from "../../../services/payroll.service";
import { useParams } from "react-router-dom";

const EditSalary = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullName: "",
    department: "",
    position: "",
    baseSalary: "",
    salaryMonth: "",
    deductions: "",
    bonus: "",
    netSalary: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [highlight, setHighlight] = useState({
    deductions: false,
    bonus: false,
    netSalary: false,
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getPayrollById(id);
        const emp = response.data?.payrolls?.employee;

        if (!emp) {
          console.error("No employee data found");
          return;
        }

        setFormData({
          fullName: emp.FullName,
          department: emp.DepartmentName,
          position: emp.PositionName,
          baseSalary: emp.BaseSalary,
          salaryMonth: emp.SalaryMonth,
          deductions: emp.Deductions,
          bonus: emp.Bonus,
          netSalary: emp.NetSalary,
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (["deductions", "bonus"].includes(id)) {
      setFormData((prev) => {
        const updated = {
          ...prev,
          [id]: value,
        };
        calculateNetSalary(updated);

        setHighlight((h) => ({ ...h, [id]: true }));
        setTimeout(() => setHighlight((h) => ({ ...h, [id]: false })), 2000);

        return updated;
      });
    }
  };

  const calculateNetSalary = (data) => {
    const base = parseFloat(data.baseSalary) || 0;
    const deductions = parseFloat(data.deductions) || 0;
    const bonus = parseFloat(data.bonus) || 0;
    const net = base + bonus - deductions;

    setFormData((prev) => ({
      ...prev,
      netSalary: net.toFixed(2),
    }));

    setHighlight((h) => ({ ...h, netSalary: true }));
    setTimeout(() => setHighlight((h) => ({ ...h, netSalary: false })), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
      try {
        const response = await updatePayroll(id, {
          Deductions: formData.deductions,
          Bonus: formData.bonus,
        });
        if (response.status === 200) {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }
      } catch (error) {
        console.error("Error updating payroll:", error);
      }
    }
  
  
    


  const getInputStyle = (id) => {
    const baseStyle = "w-full rounded-md border text-xs py-2 px-3 focus:outline-none";

    if (!["deductions", "bonus"].includes(id)) {
      return `${baseStyle} border-gray-200 bg-gray-50 text-gray-500`;
    }

    if (highlight[id]) {
      return `${baseStyle} border-green-500 bg-green-50 text-gray-800 focus:ring-1 focus:ring-green-500 transition-all duration-200`;
    }

    return `${baseStyle} border-blue-300 text-gray-800 focus:ring-1 focus:ring-blue-500`;
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-6xl flex flex-col">
        <button
          className="flex items-center text-blue-600 text-sm font-medium mb-4 cursor-pointer hover:text-blue-700 transition-colors self-start"
          onClick={() => window.history.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {showSuccess && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-sm animate-fadeIn">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium">Payroll information updated successfully!</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 sm:p-8 w-full border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-800 font-semibold text-lg">Edit Salary</h2>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">HR Update</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {[
              { id: "fullName", label: "Full Name", readonly: true },
              { id: "department", label: "Department", readonly: true },
              { id: "position", label: "Position", readonly: true },
              {
                id: "baseSalary",
                label: "Base Salary (₫)",
                readonly: true,
                format: (v) => new Intl.NumberFormat("vi-VN").format(parseFloat(v)) + " ₫",
              },
              { id: "salaryMonth", label: "Salary Month", readonly: true },
              {
                id: "deductions",
                label: "Deductions (₫)",
                editable: true,
              },
              {
                id: "bonus",
                label: "Bonus (₫)",
                editable: true,
              },
              {
                id: "netSalary",
                label: "Net Salary (₫)",
                readonly: true,
                format: (v) => new Intl.NumberFormat("vi-VN").format(parseFloat(v)) + " ₫",
              },
            ].map(({ id, label, readonly, editable, format }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-xs font-semibold text-gray-700 mb-1">
                  {label}
                  {editable && (
                    <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">Editable</span>
                  )}
                </label>
                <input
                  id={id}
                  type={editable ? "number" : "text"}
                  value={
                    format
                      ? format(formData[id])
                      : formData[id]
                  }
                  readOnly={readonly && !editable}
                  onChange={editable ? handleChange : undefined}
                  className={getInputStyle(id)}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
             
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-md shadow-md transition"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSalary;
