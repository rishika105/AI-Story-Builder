import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../api";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, { email });
      console.log("SEND API RESPONSE......", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.messaage);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SEND OTP API ERROR.......", error);
      toast.error("Could not send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(name, email, password, confirmPassword, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
        confirmPassword,
        otp,
      });
      console.log("SIGNUP API RESPONSE..........", response);

      if (!response.data.success) {
        throw new Error(response.data.messaage);
      }
      toast.success("Signup sucessful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR..............", error);
      toast.error("Signup failed");
      navigate("/verify-email");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE........", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      localStorage.setItem("token", JSON.stringify(response.data.token));

      navigate("/genres");
    } catch (error) {
      console.log("LOGIN API ERROR..............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/login");
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });
      console.log("RESET PASSWORD TOKEN API RESPONSE..........", response);

      if (!response.data.success) {
        throw new Error(response.data.messaage);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN API ERROR.........", error);
      toast.error("Failed to send for resetting password");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function resetPassword(password, confirmPassword, resetToken, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        resetToken,
      });

      console.log("RESET PASSWORD RESPONSE........", response);

      if (!response.data.success) {
        throw new Error(response.data.messaage);
      }

      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      console.log("FAILED TO RESET PASSWORD.........", error);
      toast.error("Failed to reset Password");

      if (error === true) {
        navigate("/update-password/:id");
      }
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
