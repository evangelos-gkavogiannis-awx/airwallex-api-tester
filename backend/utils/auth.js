import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function getAccessToken() {
  try {
    const response = await axios.post(
      `${process.env.AIRWALLEX_API_BASE_URL}/authentication/login`,
      {},
      {
        headers: {
          "x-client-id": process.env.AIRWALLEX_CLIENT_ID,
          "x-api-key": process.env.AIRWALLEX_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.token;  // ✅ Return access token
  } catch (error) {
    console.error("❌ Error fetching access token:", error.response?.data || error.message);
    throw new Error("Failed to get access token");
  }
}
