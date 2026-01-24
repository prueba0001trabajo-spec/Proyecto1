import { supabase } from "../supabase";

export type Categoria = {
  id: number;
  nombre: string;
};

export async function getCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("id");

  if (error) throw error;
  return data as Categoria[];
}

export async function crearCategoria(nombre: string) {
  const { error } = await supabase.from("categorias").insert([{ nombre }]);
  if (error) throw error;
}

export async function actualizarCategoria(id: number, nombre: string) {
  const { error } = await supabase
    .from("categorias")
    .update({ nombre })
    .eq("id", id);

  if (error) throw error;
}

export async function eliminarCategoria(id: number) {
  const { error } = await supabase.from("categorias").delete().eq("id", id);
  if (error) throw error;
}
