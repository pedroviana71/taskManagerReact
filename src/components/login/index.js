import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../app/api/userSlice";
import { setCredentials } from "../../features/authSlice";
import { useState } from "react";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const state = useSelector((state) => state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login({
      email: "pedritoteste1@gmail.com",
      password: "123456",
    }).unwrap();

    dispatch(setCredentials({ ...data }, "pedro"));
    console.log(data);
  };

  const teste = () => {
    console.log(state);
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
      <button onClick={teste}>teste</button>
    </section>
  );
};

export default Login;
