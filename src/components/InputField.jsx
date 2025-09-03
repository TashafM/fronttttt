// import { ErrorMessage, Field } from "formik";
// import React, { useState } from "react";

// const InputField = ({ name, type = "text", label }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const isPassword = type === "password";
//   const inputType = isPassword ? (showPassword ? "text" : "password") : type;

//   return (
//     <div className="mb-3 relative">
//       <label className="block mb-1 font-medium">
//         {label}
//         <span className="text-red-600"> *</span>
//       </label>
//       <Field
//         name={name}
//         type={inputType}
//         className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-16"
//       />
//       {isPassword && (
//         <button
//           type="button"
//           onClick={() => setShowPassword(!showPassword)}
//           className="absolute top-[38px] right-3 text-sm text-blue-600 focus:outline-none"
//         >
//           {showPassword ? "Hide" : "Show"}
//         </button>
//       )}
//       <ErrorMessage
//         name={name}
//         component="div"
//         className="text-sm font-semibold text-red-600 mt-1"
//       />
//     </div>
//   );
// };

// export default InputField;


import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useState } from "react";

const InputField = ({ name, type = "text", label }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { setFieldValue, setFieldTouched, touched } = useFormikContext();

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const handleChange = (e) => {
    const value = e.target.value;
    setFieldValue(name, value.trimStart());

    // Mark the field as touched when user types for the first time
    if (!touched[name]) {
      setFieldTouched(name, true, false);
    }
  };

  return (
    <div className="mb-3 relative">
      <label className="block mb-1 font-medium text-white">
        {label}
        <span className="text-red-600"> *</span>
      </label>
      <Field name={name}>
        {({ field }) => (
          <input
            {...field}
            type={inputType}
            onChange={handleChange}
            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-16"
          />
        )}
      </Field>
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-[38px] right-3 text-sm text-blue-600 focus:outline-none"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm font-semibold text-red-600 mt-1"
      />
    </div>
  );
};

export default InputField;
