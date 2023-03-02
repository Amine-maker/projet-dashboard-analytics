import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHook";

const AuthStatus = () => {
  const auth = useAuth();
  console.log(auth);

  const navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <p>
        Welcome {auth.user.username}!{" "}
        <button
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
        >
          Sign out
        </button>
      </p>
    </div>
  );
};

export default AuthStatus;
