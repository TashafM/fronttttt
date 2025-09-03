import { useFormikContext, Field, ErrorMessage } from "formik";

const OTPverify = ({ canResend, handleResend, timer }) => {
  const { setFieldValue, validateForm, setTouched } = useFormikContext();
  
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (pasted.length === 6) {
      pasted.split("").forEach((char, i) => {
        setFieldValue(`otp[${i}]`, char, false); // false disables immediate validation
      });

      // Set all fields as touched
      const touchedFields = {};
      for (let i = 0; i < 6; i++) touchedFields[`otp[${i}]`] = true;
      setTouched(touchedFields, false);

      // Validate after paste
      validateForm();

      // Focus last box
      setTimeout(() => {
        document.getElementById("otp-5")?.focus();
      }, 0);
    }
  };

  return (
    <div>
      <p className="text-xs text-center mb-8 w-[90%] mx-auto">
        We've sent a 6-digit verification code to your email. Please enter it
        below to verify your account.
      </p>

      <div className="flex justify-between gap-2" onPaste={handlePaste}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Field name={`otp[${idx}]`} key={idx}>
            {({ field, form }) => (
              <input
                {...field}
                type="text"
                maxLength="1"
                id={`otp-${idx}`}
                className="w-12 h-12 text-center text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/, "");
                  form.setFieldValue(`otp[${idx}]`, val);
                  if (val) {
                    const next = document.getElementById(`otp-${idx + 1}`);
                    if (next) next.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !field.value && idx > 0) {
                    const prev = document.getElementById(`otp-${idx - 1}`);
                    if (prev) prev.focus();
                  }
                }}
              />
            )}
          </Field>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="min-w-[150px]">
          <ErrorMessage
            name="otp"
            component="div"
            className="text-sm text-red-600 font-semibold"
          />
        </div>

        <div className="text-right">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-500 underline font-medium hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-gray-300">
              Resend OTP in <span className="font-semibold">{timer}s</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPverify;
