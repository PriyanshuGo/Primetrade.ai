// src/pages/dashboard/Dashboard.tsx
import { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/services/todoService";
import type { Todo } from "@/types/todo";
import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, Trash2, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import TopBar from "@/components/TopBar";

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      toast.error("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newTodo.title || !newTodo.description)
      return toast.error("Please fill all fields");
    await createTodo(newTodo);
    setNewTodo({ title: "", description: "" });
    fetchTodos();
    toast.success("Todo added successfully");
  };

  const handleUpdate = async () => {
    if (!editTodo?._id) return;
    await updateTodo(editTodo._id, {
      title: editTodo.title,
      description: editTodo.description,
    });
    setEditTodo(null);
    fetchTodos();
    toast.success("Todo updated successfully");
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    fetchTodos();
    toast.success("Todo deleted");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
<TopBar />
      {/* Add Todo */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Todo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          />
          <Button onClick={handleAdd} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Todo
          </Button>
        </CardContent>
      </Card>

      {/* List Todos */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        todos.map((todo) => (
          <Card key={todo._id} className="border border-gray-200">
            <CardContent className="flex justify-between items-start py-4">
              <div>
                <h2 className="font-semibold text-lg">{todo.title}</h2>
                <p className="text-gray-600 text-sm">{todo.description}</p>
              </div>
              <div className="flex gap-2">
                {/* Edit Todo */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditTodo(todo)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Todo</DialogTitle>
                    </DialogHeader>
                    <Input
                      placeholder="Title"
                      value={editTodo?.title || ""}
                      onChange={(e) =>
                        setEditTodo({ ...editTodo!, title: e.target.value })
                      }
                    />
                    <Textarea
                      placeholder="Description"
                      value={editTodo?.description || ""}
                      onChange={(e) =>
                        setEditTodo({ ...editTodo!, description: e.target.value })
                      }
                    />
                    <Button onClick={handleUpdate}>Update</Button>
                  </DialogContent>
                </Dialog>

                {/* Delete Todo */}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(todo._id!)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

// const Dashboard = () => {
//   return <div>Dashboard</div>;
// };

export default Dashboard;
