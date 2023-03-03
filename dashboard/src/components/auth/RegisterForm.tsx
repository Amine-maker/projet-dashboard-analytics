import React, { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Role } from "../../core/utils/enum";
import { useAuth } from "../../hooks/AuthHook";

const RegisterForm = (): any => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const from = location.state?.from?.pathname || "/admin";

  useEffect(() => {
    if (auth.isAuth) {
      navigate("/admin", { replace: true });
    }
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;

    auth.register({ username, password, email, roles: [Role.USER] }, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <label>
          Email: <input name="email" type="email" />
        </label>{" "}
        <label>
          Password: <input name="password" type="password" />
        </label>{" "}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
