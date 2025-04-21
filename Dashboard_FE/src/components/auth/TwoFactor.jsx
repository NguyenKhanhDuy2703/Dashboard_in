import { useState } from "react";

const TwoFactorAuth = () => {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const newCodes = [...codes];
    newCodes[index] = e.target.value.slice(-1);
    setCodes(newCodes);

    // Auto-focus next box
    if (e.target.value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  return (
 
      <div className="bg-white rounded-2xl shadow-xl border border-blue-500 flex overflow-hidden w-full max-w-5xl">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-10">
         
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2 font-semibold">2FA</p>
            <h3 className="text-xl font-bold mb-4">Please enter the 2FA code<br />sent to your mail.</h3>
          </div>
          {/* OTP Inputs */}
          <div className="flex gap-3 justify-center mb-6">
            {codes.map((value, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e, index)}
                className="w-10 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded hover:opacity-90 transition">
            Verify
          </button>
        </div>
      </div>
   
  );
};

export default TwoFactorAuth;
