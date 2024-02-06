import { Link } from "react-router-dom";
import SigninForm from "../components/SigninForm";
import LazyImage from "../components/LazyImage";

function SignIn() {
  return (
    <>
      <section className="auth-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-lvh auth-sections">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 auth-form">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-gray-600 mb-4">
              Don&#x27;t have an account?
                <Link
                  className="font-medium text-black   transition-all duration-200 hover:underline ml-2"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </p>
              <SigninForm />
            </div>
          </div>
          <div className="h-full w-full auth-img">
            <LazyImage
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1742&amp;q=80"
              alt="Blog Image"
              className="mx-auto h-full w-full object-cover"
              width={832}
              height={554}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
