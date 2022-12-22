import { useState } from "react";
import { useRegisterMutation } from "../../app/api/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register({
        email,
        password,
        username,
      });
      navigate("/login");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Register</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          Registrar
        </button>
      </form>
    </section>
  );
};

export default Register;
