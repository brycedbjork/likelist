import { v4 as uuidv4 } from "uuid";

const startAuth = () => {
  // generate uuid
  const authState = uuidv4();
  localStorage.setItem("authState", authState);
  console.log("should set", authState);
  window.open(`/api/auth?state=${authState}`);
};

export default startAuth;
