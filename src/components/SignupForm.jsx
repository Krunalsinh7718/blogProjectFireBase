import React, { useState } from "react";
import auth from "../firebase/AuthService";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Input from "./Input";
import DataLoader from "./DataLoader";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { toast } from "react-toastify";
import BtnLoader from "./BtnLoader";

function SignupForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [dataLoading, setDataLoading] = useState();
  const dispatch = useDispatch();

  const handleSignup = async (data) => {
    setDataLoading(true);
    try {
      const userCredential = await auth.registerUser(data);

      if(userCredential){
        toast.success("Account created and login successfully.");
        dispatch(login(userCredential.user));
        setDataLoading(false);
      }else{
        setDataLoading(false);
      }
    } catch (error) {
      setDataLoading(false);
      console.error("Error handle signup: ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignup)} autoComplete="off">
        <div className="space-y-5">
          <div>
            <Input
              label="Email"
              type="email"
              {...register("email", {
                required: "This is required",
                maxLength: {
                  value: 20,
                  message: "Maximum length of name is 30.",
                },
              })}
            />
            <div className="text-red-600">
              <ErrorMessage errors={errors} name="email" />
            </div>
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              {...register("password", {
                required: "This is required",
                maxLength: {
                  value: 20,
                  message: "Maximum length of name is 30.",
                },
              })}
            />
            <div className="text-red-600">
              <ErrorMessage errors={errors} name="password" />
            </div>
          </div>
          <Button
            type="submit"
            className="h-14 h-14 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 relative"
            disabled={dataLoading}
          >
           
              <span className={`${dataLoading ? 'invisible ' : 'visible'} inline-flex items-center`}>
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
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <BtnLoader className={`${!dataLoading ? 'invisible' : 'visible'} absolute inset-0 m-auto`} />
          </Button>
        </div>
      </form>
    </>
  );
}

export default SignupForm;
