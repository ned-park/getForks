import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { signupFormItems } from "../components-data/SignupForm";
import Form from "../components/Form";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, error, isLoading } = useSignup();

  const handleChange = (event) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await signup(formData.username, formData.password);
  };

  return (
    <section className="mt-24 m-auto container flex flex-col px-2">
      <h2 className="text-xl font-bold text-center mb-6">Signup</h2>
      <Form
        handleClick={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        formItems={signupFormItems}
        submitText="Signup"
      />
      {error && <div className="error">{error}</div>}
    </section>
  );
}
