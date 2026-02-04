// 📌 src/api/iamportAxiosInstance.ts
import axios from "axios";
/**
 * 🛠️ IAMPORT API 전용 Axios 인스턴스
 */
const iamportAxiosInstance = axios.create({
  baseURL: "https://api.iamport.kr",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default iamportAxiosInstance;
