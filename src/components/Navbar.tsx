import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
