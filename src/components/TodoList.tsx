import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { removeTodo, setTodos, startLoading, updateTodo } from "../store/todosSlice";
import { TodoItem } from "../interfaces/todoInterface";
import { useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE } from "../App";
import { setForm } from "../store/modalSlice";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TbMoodSad } from "react-icons/tb";
import Todo from "./Todo";

const TodoList = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, sortBy } = useSelector((state: RootState) => {
    return state.todos
  })

  const fetchTodos = async () => {
    const res = await axios.get<TodoItem[]>
      (API_BASE)
    dispatch(setTodos(res.data
      .sort((a, b) => b.creationDate.localeCompare(a.creationDate))))
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleUpdateStatus = async (todo: TodoItem) => {
    dispatch(startLoading());
    await axios.put<TodoItem>(API_BASE + '/' + todo.id, todo)
    dispatch(updateTodo(todo))
  }

  const handleDelete = async (id: TodoItem['id']) => {
    dispatch(startLoading());
    await axios.delete(API_BASE + '/' + id)
    dispatch(removeTodo(id))
  }


  const handleUpdate = (todo: TodoItem) => {
    dispatch(setForm(todo))
  }



  // to complete 
  const todosRefs = useRef<HTMLDivElement>(null);

  const animationRef = useRef(false)
  useGSAP(() => {
    if (!loading && !animationRef.current && todosRefs.current) {
      animationRef.current = true;
      gsap.from(todosRefs.current.children, {
        ease: 'power3.out',
        translateY: -20,
        opacity: 0.3,
        stagger: 0.3,
      });
    }
  }, [data]);









  const sortedTodos = [...data].sort((a, b) => {
    switch (sortBy) {
      case "Date":
        return b.creationDate.localeCompare(a.creationDate);
      case "Priority":
        if (a.priority !== b.priority) {
          return b.priority - a.priority;
        } else {
          return b.creationDate.localeCompare(a.creationDate);
        }
      case "Due date":
        if (a.dueDate === null && b.dueDate === null) {
          return b.creationDate.localeCompare(a.creationDate);
        } else if (a.dueDate === null) {
          return 1;
        } else if (b.dueDate === null) {
          return -1;
        } else {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
      default:
        return 0;
    }
  });

  return (
    <div id="todo-list" className="w-full px-4 py-6 flex flex-col gap-y-4 items-center" ref={todosRefs}>
      {sortedTodos.length ? sortedTodos.map((todo) => {
        return (
          <Todo todo={todo} key={todo.id}
            handleUpdateTodo={handleUpdate} deleteTodo={handleDelete}
            updateStatus={handleUpdateStatus} />
        )
      }) :
        <div className="shadow-lg px-3 font-semibold py-2 rounded-xl bg-cyan-100 dark:bg-sky-400 flex items-center">No todos yet<TbMoodSad size={25} /></div>}
    </div>
  )
}

export default TodoList