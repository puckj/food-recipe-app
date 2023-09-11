import axios from "axios";
import { API_BASE_URL } from "../constants";

export const GET = async (endpoint: string) => {
  try {
    const config = {
      method: "get",
      url: API_BASE_URL + "/api/json/v1/1" + endpoint,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await axios(config);
    // console.log(result.data, "result = [AXIOS]");
    return result.data;
  } catch (error) {
    throw error;
  }
};
