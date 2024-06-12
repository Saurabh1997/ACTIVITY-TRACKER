import { Fragment, useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isOTPActive, setIsOTPActive] = useState(false);
  const [otpValue, setOTPValue] = useState("");

  const sendOTP = () => {
    if (isOTPActive) {
    } else {
      setIsOTPActive(true);
    }
  };

  return (
    <Fragment>
      <strong>Reset your Password</strong>
      <input
        type="text"
        name="email"
        className={"m-2 p-2 text-black rounded-sm"}
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {isOTPActive && (
        <input
          type="number"
          name="OTP"
          className={"m-2 p-2 text-black rounded-sm"}
          placeholder="Enter OTP received in your Email"
          value={otpValue}
          onChange={(e) => setOTPValue(e.target.value)}
        />
      )}
      <button className={"border"} onClick={sendOTP}>
        {isOTPActive ? "Submit OTP" : "Send OTP to your Email"}
      </button>
      {isOTPActive && (
        <button className={"m-2 underline"} onClick={() => sendOTP}>
          Resend OTP
        </button>
      )}
    </Fragment>
  );
};
export default ResetPassword;
