import { Fragment, useState } from "react";
import Turnstile, { useTurnstile } from "react-turnstile";
import axios from "axios";

const ResetPassword = () => {
  const turnstile = useTurnstile();
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
        <Fragment>
          <input
            type="number"
            name="OTP"
            className={"m-2 p-2 text-black rounded-sm"}
            placeholder="Enter OTP received in your Email"
            value={otpValue}
            onChange={(e) => setOTPValue(e.target.value)}
          />
          <Turnstile
            sitekey="0x4AAAAAAAchjOYtDnGWBrNL"
            onVerify={async (token) => {
              const res = await axios.post(
                "http://localhost:4040/forgotpassword",
                {
                  token,
                }
              );
              if (!res.ok) turnstile.reset();
            }}
          />
        </Fragment>
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
