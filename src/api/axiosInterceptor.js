import axios from "axios";

// Create an instance of meet
const meetApi = axios.create({
  timeout: 1000,
});

// Add a request interceptor to include withCredentials
meetApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("MEET_ACCESS_TOKEN");
    if (token) {
      console.log("[axios intercepter] Header에 AccessToken을 포함합니다.");
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error(
        "[axios intercepter] LocalStorage에 AccessToken이 없습니다."
      );
    }
    config.withCredentials = true; // TODO : 뺴
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
meetApi.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // if (error.response && error.response.status === 401) {
    //   // Handle unauthorized access
    //   // console.error("401 Unauthorized access, 로그인 페이지로 이동합니다.");
    //   // window.location.href = "/login";
    //   const currentLocation = window.location.pathname;
    //   if (
    //     currentLocation !== "/login" &&
    //     currentLocation !== "/login/local" &&
    //     currentLocation !== "/register" &&
    //     currentLocation !== "/register/terms"
    //   ) {
    //     console.error(
    //       "[axios intercepter] 401 Unauthorized access, 로그인 페이지로 이동합니다."
    //     );
    //     window.location.href = "/login";
    //   }
    // }
    return Promise.reject(error);
  }
);

export default meetApi;
