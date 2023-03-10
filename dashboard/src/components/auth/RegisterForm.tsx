import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Role } from "../../core/utils/enum";
import { useAuth } from "../../hooks/AuthHook";

const RegisterForm = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const from = location.state?.from?.pathname || "/profile";

  useEffect(() => {
    if (auth.isAuth) {
      navigate("/profile", { replace: true });
    }
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;

    auth.register({ username, password, email, roles: [Role.USER] }, () => {
      navigate("/profile", { replace: true });
    });
  }

  return (
    <section className="bg-gray-50 ml-60 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto h-screen md:justify-center lg:py-0">
        <div className="w-full bg-white rounded-lg border border-gray-300 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="flex items-center justify-center p-6  text-2xl font-semibold text-gray-900 dark:text-white">
            <img width={800} height={100} className="w-8 h-8 mr-2" src="https://res.cloudinary.com/dvbzs4nlk/image/upload/v1678042412/portfolio/logo-portfolio_rji67t.svg" alt="logo" />
            Dadasha
          </h2>{" "}
          <hr />
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Création de mon compte</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nom d&apos;utilisateur
                </label>
                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mot de passe
                </label>
                <input type="password" autoComplete="current" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>

              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Creer mon compte
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Deja un compte ?{" "}
                <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Connexion.
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
