import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <section>
      <h1>Voce realmente deseja sair?</h1>
      <button onClick={handleLogout}>Sair</button>
      <button onClick={handleBack}>Voltar</button>
    </section>
  );
};

export default Logout;
