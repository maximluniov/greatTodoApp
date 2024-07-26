import { TodoItem } from "../interfaces/todoInterface"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useRef } from "react";
import gsap from "gsap";


interface TodoProps{
    updateStatus:(todo:TodoItem)=>void,
    handleUpdateTodo:(todo:TodoItem)=>void,
    deleteTodo:(id:TodoItem['id'])=>void,
    todo:TodoItem,
}


const Todo = ({updateStatus,handleUpdateTodo,deleteTodo,todo}:TodoProps) => {
    
    const todoRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null)
    

    const getDays = () => {
        if (todo.dueDate) {
          if (new Date(todo.dueDate) > new Date()) {
            const differenceMs = Math.abs(new Date(todo.dueDate).getTime() - new Date().getTime());
  
            const MS_PER_DAY = 1000 * 60 * 60 * 24;
            const differenceDays = Math.ceil(differenceMs / MS_PER_DAY);
            return differenceDays;
          }
          else {
            return "Todo is overdue"
          }
        } else {
          return "No time limit"
        }
      }

      const toggleDetails = () => {
        if(detailsRef.current && todoRef.current){
            if (detailsRef.current.style.height === '0px'  ) {
              gsap.fromTo(detailsRef.current, { height: 'auto', opacity: 0, display: 'flex', padding: "16px" }, { height: 'auto', opacity: 1, duration: 0.3, padding: "16px" });
              gsap.to(todoRef.current.children[0], { duration: 0.3, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 })
              gsap.to(todoRef.current.children[0].children[1].children[1].children[1], { scaleY: -1, duration: 0.8, ease: 'power3.out' });
            } else {
              gsap.to(todoRef.current.children[0].children[1].children[1].children[1], { scaleY: 1, duration: 0.4, ease: 'power3.in' });
              gsap.to(detailsRef.current, { height: 0, opacity: 0, duration: 0.3, padding: 0 });
              gsap.to(todoRef.current.children[0], { duration: 0.3, borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px" })
            }
        }
      }


  return (
    <div ref={todoRef} 
        className={` overflow-hidden  todo_item  w-full md:w-2/3 lg:w-1/2 ${getDays() === 'Todo is overdue' && 'ring-2 ring-red-600 rounded-xl'} ${todo.status && ' line-through'}  `} key={todo.id}>
        <div className="z-10 w-full flex rounded-xl  bg-cyan-300 dark:bg-cyan-400  px-3 pt-3 gap-x-4 justify-between" >
          <div>
            <button className="control-button  dark:bg-gray-100" onClick={() => {
              const updatedTodo = {
                ...todo,
                status: !todo.status,
              }
              updateStatus(updatedTodo)
            }}>
              {todo.status ? <FaCheck /> : null}
            </button>
          </div>

          <div className="flex flex-col w-full items-center">

            <div className="text-start w-full font-semibold flex justify-between">
              <p className="break-all">
                {todo.title}
              </p>
              <p>
                {typeof getDays() === 'number' ? getDays() + " days left" : getDays()}
              </p>

            </div>

            <div className="cursor-pointer flex items-center" onClick={() => toggleDetails()}>
              <p>
                Details
              </p>
              <div>
                <IoIosArrowDown />
              </div>
            </div>
          </div>
          <div className="flex gap-x-2">
            <button className="control-button" onClick={() => handleUpdateTodo(todo)}><MdEdit size={23} /></button>

          </div>
        </div>
        <div ref={detailsRef}

          className="bg-sky-200 dark:bg-sky-300 rounded-b-xl w-full flex-col hidden opacity-0" style={{ height: 0 }}>
          <p className="break-all">
            {todo.notes ? todo.notes : 'No description'}
          </p>

          <div className="flex flex-col items-end sm:flex-row justify-between w-full">
            <div className="sm:w-auto w-full">
              <p>Created:{todo.creationDate}</p>
              <p>Due date:{getDays() === 'No time limit' ? getDays() : new Date(todo.dueDate!).toLocaleString()}</p>
            </div>

            <div>
              <button className="control-button" onClick={() => deleteTodo(todo.id)}><MdDelete size={22} /></button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Todo