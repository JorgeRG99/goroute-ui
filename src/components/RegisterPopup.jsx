/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { usePopups } from "../hooks/usePopups";

export const RegisterPopup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const { displayRegisterPopup } = usePopups();

  const { register } = useAuth();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleBirthChange = (e) => {
    setBirth(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    register({
      username: username,
      name: name,
      surname: surname,
      email: email,
      password: password,
      birth: birth,
      followers: {},
      follows: {},
    });
  };

  return (
    <div
      id="register-popup"
      tabIndex="-1"
      className={`bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            onClick={displayRegisterPopup}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="#c6c7c7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close popup</span>
          </button>

          <div className="p-5">
            <h3 className="text-2xl mb-0.5 font-medium"></h3>
            <p className="mb-4 text-sm font-normal text-gray-800"></p>

            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Registrar una cuenta
              </p>
              <p className="mt-2 text-sm leading-4 text-slate-600">
                Comienza tu mejor version!
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-2">
              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px]"
                />
                Continuar con Google
              </button>
            </div>

            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200" />
            </div>

            <form className="w-full" onSubmit={handleSubmit}>
              <label htmlFor="name" className="sr-only">
                Nombre de usuario
              </label>
              <input
                name="name"
                type="text"
                required=""
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Nombre de usuario"
                value={username}
                onChange={handleUsernameChange}
              />

              <label htmlFor="name" className="sr-only">
                Nombre
              </label>
              <input
                name="name"
                type="text"
                required=""
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Nombre"
                value={name}
                onChange={handleNameChange}
              />

              <label htmlFor="surname" className="sr-only">
                Apellidos
              </label>
              <input
                name="surname"
                type="text"
                required=""
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Apellidos"
                value={surname}
                onChange={handleSurnameChange}
              />

              <label htmlFor="birth" className="sr-only">
                Fecha de nacimiento
              </label>
              <input
                name="birth"
                type="date"
                required=""
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Fecha de nacimiento"
                value={birth}
                onChange={handleBirthChange}
              />

              <label htmlFor="email" className="sr-only">
                Correo Electrónico
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required=""
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Correo Electrónico"
                value={email}
                onChange={handleEmailChange}
              />

              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required=""
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
              />

              <label htmlFor="password" className="sr-only">
                Confirmar Contraseña
              </label>
              <input
                name="passwordConfirm"
                type="password"
                autoComplete="current-password"
                required=""
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Confirmar Contraseña"
                value={password_confirmation}
                onChange={handlePasswordConfirmationChange}
              />
              <button
                type="submit"
                className="mb-3 mt-2 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
