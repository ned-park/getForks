import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { loginFormItems } from "../components-data/LoginForm";
import Form from "../components/Form";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, error, isLoading } = useLogin();

  const handleChange = (event) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formData.username, formData.password);
  };

  return (
    <section className="mt-24 mx-auto container flex flex-col px-2">
      <h2 className="text-xl font-bold text-center mb-6">Login</h2>
      <div className="mx-auto text-center mb-3">
        <h4 className="font-bold">For demo</h4>
        <p>Username: demo</p>
        <p>Password: demo</p>
        </div>
      <Form
        handleClick={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        formItems={loginFormItems}
        submitText="Login"
      />
      {error && <div className="error">{error}</div>}
    </section>
  );
}
