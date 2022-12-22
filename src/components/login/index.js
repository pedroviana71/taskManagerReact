import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../app/api/authSlice";
import { setCredentials } from "../../features/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (user.username !== null) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({
        email,
        password,
      }).unwrap();
      setEmail("");
      setPassword("");
      navigate("/");
      dispatch(setCredentials(data, data.username));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
