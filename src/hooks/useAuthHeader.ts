const useAuthHeader = () => {
  const token = localStorage.getItem("token"); // HARUS sama dengan Login.js

  return {
    Authorization: `Bearer ${token || ""}`,
  };
};

export default useAuthHeader;
