type Props = {
  task: any;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onEdit, onDelete }: Props) {
  return (
    <li>
      {task.title}
      <button onClick={() => onEdit(task.id, task.title)}>Editar</button>
      <button onClick={() => onDelete(task.id)}>Borrar</button>
    </li>
  );
}
