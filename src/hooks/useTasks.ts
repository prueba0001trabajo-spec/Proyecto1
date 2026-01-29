import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export function useTasks() {
  const [tasks, setTasks] = useState<any[]>([]);

  // READ
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("task")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setTasks(data || []);
  };

  // CREATE
  const createTask = async (title: string) => {
    const { error } = await supabase.from("task").insert({ title });
    if (!error) fetchTasks(); // 🔁 CLAVE
  };

  // UPDATE
  const updateTask = async (id: number, title: string) => {
    const { error } = await supabase
      .from("task")
      .update({ title })
      .eq("id", id);

    if (!error) fetchTasks(); // 🔁 CLAVE
  };

  // DELETE
  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("task").delete().eq("id", id);
    if (!error) fetchTasks(); // 🔁 CLAVE
  };

  useEffect(() => {
    fetchTasks(); // carga inicial
  }, []);

  return { tasks, createTask, updateTask, deleteTask };
}
