import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { toggleModal } from "../store/modalSlice";
import { changeSortBy, SortBy } from "../store/todosSlice";

const AddTodo = () => {

    const dispatch = useDispatch<AppDispatch>();

    const toggleDispatch = () => {
        dispatch(toggleModal());
    }

    const sortBy = useSelector((state:RootState)=>state.todos.sortBy)


    const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        dispatch(changeSortBy(e.target.value as SortBy))
    }




    return (
        <div className="w-full p-4 flex flex-col items-center  justify-around">
            <div className="flex w-full justify-between sm:justify-around ">
                <button onClick={toggleDispatch}
                    className="simple-button">
                    Add todo +
                </button>
                <select id="sortBy" value={sortBy} onChange={handleChangeSortBy}
                    className="simple-button">
                    <option value="Date">Date</option>
                    <option value="Priority">Priority</option>
                    <option value="Due date">Due date</option>
                </select>
            </div>


        </div>
    )
}

export default AddTodo