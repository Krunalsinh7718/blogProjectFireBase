import { useState } from "react";
import auth from "../firebase/AuthService";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .registerUser({ email: email, password: password })
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("auth", auth.auth);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode " + errorCode, " errorMessage" + errorMessage);
      });
  };

  const handleLogout = () => {
    auth.logout().then(() => {
      console.log("logout check auth", auth.auth);
    });
  };

  const handleCheckAuth = () => {
    console.log("just check auth ", auth.auth);
  };



  return (
    <>
      

     
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 bg-white dark:bg-black min-h-lvh">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                height={56}
                fill="none"
              >
                <path
                  fill="#000"
                  d="M23.273.253C20.808 1.19 2.12 12.235 1.085 13.369 0 14.552 0 14.749 0 27.767c0 11.883.099 13.362.838 14.25 1.282 1.528 22.386 13.46 23.816 13.51 1.282.049 21.449-11.144 23.569-13.067 1.085-.986 1.085-1.134 1.085-14.644s0-13.658-1.085-14.645C46.645 11.741 27.119.45 25.64.105c-.69-.197-1.726-.099-2.367.148Zm-3.057 21.646c0 .592-1.233 1.923-3.205 3.5-1.775 1.381-3.205 2.565-3.205 2.663 0 .05 1.43 1.036 3.156 2.17 1.726 1.134 3.303 2.416 3.451 2.86.395.937-.542 2.12-1.578 2.12-1.035 0-9.812-5.818-10.157-6.706-.345-.887.69-1.972 5.67-5.621 3.304-2.465 4.142-2.86 4.931-2.465.493.295.937.936.937 1.479Zm5.473 5.769c-2.268 7.248-2.662 8.086-3.55 7.199-.394-.395 0-2.22 1.529-6.903 2.564-7.643 2.86-8.333 3.6-7.594.344.345-.1 2.416-1.579 7.298Zm10.404-4.438c4.586 3.008 5.227 3.797 4.24 4.93-1.183 1.43-8.677 7.052-9.417 7.052-.986 0-1.972-1.331-1.677-2.17.148-.394 1.726-1.824 3.501-3.155l3.255-2.416-3.452-2.318c-1.923-1.232-3.451-2.416-3.451-2.564 0-.838 1.134-2.17 1.824-2.17.444 0 2.761 1.283 5.177 2.811Z"
                />
              </svg>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-gray-600 dark:text-white">
              Already have an account?
              <a
                href="#"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline ml-1 dark:text-white"
              >
                Sign In
              </a>
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
                      placeholder="email"
                      type="email"
                      value={email}
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      placeholder="passowrd"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-base font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
                      type="password"
                      placeholder="Password"
                      id="password"
                    />
                  </div>
                </div>
                <div> {email}|{password}</div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 dark:text-white"
                  >
                    Create Account
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                onClick={() => auth.signInWithGoogle()}
              >
                <span className="mr-2 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height={24}
                    width={24}
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                  </svg>
                </span>
                Sign up with Google
              </button>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height={24}
                    width={24}
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                  </svg>
                </span>
                Sign up with Facebook
              </button>
              <div>
              <button className="dark:text-white mr-2" onClick={handleLogout}>logout</button> |
                <button className="dark:text-white" onClick={handleCheckAuth}>check auth</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignupForm;
