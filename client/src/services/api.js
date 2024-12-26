
const BASE_URL = process.env.REACT_APP_BASE_URL

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
  }
  
// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

//STORY AI ENDPOINTS
export const AIendpoints = {
  GENRES_API: BASE_URL + "/ai/genres",
  GENERATE_STORY_AI_API: BASE_URL + "/ai/generate-prompt"
}
