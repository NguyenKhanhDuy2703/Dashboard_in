import React from "react";

const editSalary = () => {
    return (
        <div className="bg-[#F7FAFC] min-h-screen flex flex-col p-6 sm:p-10" style={{ fontFamily: "'Inter', sans-serif" }}>
          <a href="#" className="flex items-center text-[#2C7BE5] text-sm font-normal mb-8 select-none">
            <i className="fas fa-chevron-left mr-2"></i> Back
          </a>

          <form className="bg-white bg-opacity-5 rounded-xl p-8 max-w-5xl w-full">
            <h2 className="text-black font-semibold text-base mb-6 select-none">Edit salary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl">
              <div>
                <label htmlFor="fullName" className="block text-[10px] font-semibold text-[#1E293B] mb-1 select-none">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter amount in Naira"
                  className="w-full rounded-md border border-[#CBD5E1] text-xs placeholder:text-[#94A3B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#2C7BE5]"
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-[10px] font-semibold text-[#1E293B] mb-1 select-none">Department</label>
                <input
                  id="department"
                  type="text"
                  placeholder="Enter amount in Naira"
                  className="w-full rounded-md border border-[#CBD5E1] text-xs placeholder:text-[#94A3B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#2C7BE5]"
                />
              </div>

              <div>
                <label htmlFor="baseSalary" className="block text-[10px] font-semibold text-[#1E293B] mb-1 select-none">Base Salary</label>
                <input
                  id="baseSalary"
                  type="text"
                  placeholder="Enter amount in Naira"
                  className="w-full rounded-md border border-[#CBD5E1] text-xs placeholder:text-[#94A3B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#2C7BE5]"
                />
              </div>
              <div>
                <label htmlFor="salaryMonth" className="block text-[10px] font-semibold text-[#1E293B] mb-1 select-none">Salary month</label>
                <input
                  id="salaryMonth"
                  type="text"
                  placeholder="Enter amount in Naira"
                  className="w-full rounded-md border border-[#CBD5E1] text-xs placeholder:text-[#94A3B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#2C7BE5]"
                />
              </div>

              <div>
                <label htmlFor="deductions" className="block text-[10px] font-semibold text-[#1E293B] mb-1 select-none">Deductions</label>
                <input
                  id="deductions"
                  type="text"
                  placeholder="Enter amount in Naira"
                  className="w-full rounded-md border border-[#CBD5E1] text-xs placeholder:text-[#94A3B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#2C7BE5]"
                />
              </div>
              <div>
                <label htmlFor="bouns" className="block text-[10px] font-semibold text-[#1E293B] mb-1 select-none">Bouns</label>
                <input
                  id="bouns"
                  type="text"
                  placeholder="Enter amount in Naira"
                  className="w-full rounded-md border border-[#CBD5E1] text-xs placeholder:text-[#94A3B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#2C7BE5]"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="nextSalary" className="block text-[10px] font-semibold text-[#1E293B] mb-1 select-none">Next Salary</label>
                <input
                  id="nextSalary"
                  type="text"
                  placeholder="Enter amount in Naira"
                  className="w-full rounded-md border border-[#CBD5E1] text-xs placeholder:text-[#94A3B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#2C7BE5]"
                />
              </div>
              <div className="sm:col-span-1 flex items-end justify-end">
                <button
                  type="submit"
                  className="w-40 py-2 text-[10px] text-white rounded-md bg-gradient-to-r from-[#2C7BE5] to-[#3B4CCA] font-normal"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }

export default editSalary;