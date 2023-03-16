/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useAuth from "@/hook/useAuth";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ChangeEvent, useEffect, useState } from "react";
import AuthModalInputs from "./AuthModalInputs";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin } = useAuth();

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent;
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const handleClick = () =>
    signin({ email: inputs.email, password: inputs.password });

  useEffect(() => {
    if (isSignin) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.city &&
        inputs.phone &&
        inputs.password
      ) {
        return setDisabled(false);
      }
    }
    setDisabled(true);
  }, [inputs]);

  return (
    <div>
      <button
        className={`${renderContent(
          "bg-blue-400",
          ""
        )} border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderContent("Sign in", "Sign up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="text-sm  text-red-700">
                {renderContent("Sign In", "Create Account")}
              </p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center ">
                {renderContent("Log Into Account", "Create Account")}
              </h2>
              <AuthModalInputs
                isSignin={isSignin}
                handleChangeInput={handleChangeInput}
                inputs={inputs}
              />
              <button
                onClick={handleClick}
                className="uppercase bg-red-600 w-full text-whi
                te p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                disabled={disabled}
              >
                <h2 className="text-2xl font-light text-center ">
                  {renderContent("Sign In", "Sign Up")}
                </h2>
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
