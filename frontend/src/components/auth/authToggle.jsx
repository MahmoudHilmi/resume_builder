import React from "react";

const AuthToggle = ({ isLogin, setIsLogin }) => {
  return (
    <button
      onClick={() => setIsLogin(!isLogin)}
      className="mt-4 text-blue-500"
    >
      {isLogin ? "Create account" : "Already have an account?"}
    </button>
  );
};

export default AuthToggle;