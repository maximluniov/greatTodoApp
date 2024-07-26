import AddTodo from "./components/AddTodo"
import Modal from "./components/Modal"
import TodoList from "./components/TodoList"
import Header from "./components/Header"
import Loader from "./components/Loader"

//TODO skelet loader,tags,action messages , cancel delete  

export const API_BASE = `${import.meta.env.VITE_API_URL}`


function App() {
  return (
    <div className="App h-screen dark:text-white dark:bg-gray-800">
      <Header />
      <AddTodo />
      <TodoList />
      <Loader />
      <Modal />
    </div>
  )
}

export default App
