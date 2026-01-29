import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import Navbar from "../components/Navbar";
import { useTasks } from "../hooks/useTasks";

export default function Tasks() {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();

  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const addTask = async () => {
    if (!title) return;
    await createTask(title);
    setTitle("");
  };

  const startEdit = (id: number, currentTitle: string) => {
    setEditId(id);
    setEditTitle(currentTitle);
  };

  const saveEdit = async () => {
    if (!editId) return;
    await updateTask(editId, editTitle);
    setEditId(null);
    setEditTitle("");
  };

  return (
    <>
      <Navbar />

      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" mb={2}>
            Mis tareas
          </Typography>

          {/* Crear tarea */}
          <Stack direction="row" spacing={1} mb={3}>
            <TextField
              label="Nueva tarea"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button variant="contained" onClick={addTask}>
              Agregar
            </Button>
          </Stack>

          {/* Lista */}
          {tasks.map((task) => (
            <Paper
              key={task.id}
              sx={{
                p: 2,
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {editId === task.id ? (
                <>
                  <TextField
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    size="small"
                    fullWidth
                  />
                  <IconButton color="success" onClick={saveEdit}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={() => setEditId(null)}>
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography>{task.title}</Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => startEdit(task.id, task.title)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </>
              )}
            </Paper>
          ))}
        </Paper>
      </Box>
    </>
  );
}
