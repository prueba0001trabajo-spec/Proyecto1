import { useEffect, useState } from "react";
import {
  getCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  type Categoria,
} from "./api/categoriasApi";

function App() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nombre, setNombre] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  async function cargar() {
    const data = await getCategorias();
    setCategorias(data);
  }

  useEffect(() => {
    cargar();
  }, []);

  async function guardar() {
    if (!nombre.trim()) return;

    if (editId === null) {
      await crearCategoria(nombre);
    } else {
      await actualizarCategoria(editId, nombre);
    }

    setNombre("");
    setEditId(null);
    cargar();
  }

  async function borrar(id: number) {
    await eliminarCategoria(id);
    cargar();
  }

  function editar(cat: Categoria) {
    setEditId(cat.id);
    setNombre(cat.nombre);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>
        Categorías Dentro de la base de datos Categorías Dentro de la base de
        datos
      </h2>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <button onClick={guardar}>
        {editId === null ? "Agregar" : "Actualizar"}
      </button>

      <hr />

      {categorias.map((c) => (
        <div key={c.id}>
          {c.id} - {c.nombre}
          <button onClick={() => editar(c)}>✏️</button>
          <button onClick={() => borrar(c.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default App;
