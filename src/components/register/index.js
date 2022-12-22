import { useRegisterMutation } from "../../app/api/authSlice";

const Register = () => {
  const [register] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register({
      email: "pedritoteste1@gmail.com",
      password: "123456",
      username: "pedro",
    });
    console.log(data);
  };

  return (
    <section>
      <h1>Register</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </section>
  );
};

export default Register;
