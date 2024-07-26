import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { IoCloseOutline } from "react-icons/io5";
import { toggleModal, changeTitle, changePriority, changeDueDate, changeNotes } from '../store/modalSlice';
import { priority, TodoItem } from '../interfaces/todoInterface';
import { addTodo, startLoading, updateTodo } from '../store/todosSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { API_BASE } from '../App';
import gsap from 'gsap';





const Modal = () => {

    const dispatch = useDispatch<AppDispatch>();

    const {isModalOpened,action} = useSelector((state: RootState) => state.modal)

    const loading = useSelector((state:RootState)=>state.todos.loading);

    const { title, priority, id, dueDate, notes, creationDate, status } = useSelector((state: RootState) => {
        return state.modal.form
    })







    const dialog = useRef<HTMLDialogElement>(null);

    const closeModal = () => {
        dispatch(toggleModal())
    }

    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTitle(e.target.value))
    }
    const updatePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changePriority(e.target.value as unknown as priority))
    }
    const updateDueDate = (date: Date | null) => {
        dispatch(changeDueDate(date ? date.toISOString() : null))
    }
    const updateNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeNotes(e.target.value))
    }

    const minTime = new Date();


    const handleTodoCreation = async () => {

        dispatch(startLoading());           
        const todo = {
            title: title? title : "No title" ,
            priority,
            dueDate: dueDate ? dueDate : null,
            creationDate: (new Date()).toLocaleString(),
            status: false,
            notes: notes
        }
        const res = await axios.post<TodoItem>(API_BASE, todo)
        dispatch(addTodo(res.data))
    }

    const handleTodoUpdate = async () => {
        dispatch(startLoading());
        const todo = {
            title: title? title : "No title" ,
            priority,
            id,
            dueDate,
            creationDate,
            status,
            notes
        }
        await axios.put<TodoItem>(API_BASE + '/' + todo.id, todo)
        dispatch(updateTodo(todo))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        e.preventDefault();
    };





    useEffect(() => {
        if (dialog.current) {
            if (isModalOpened) {
                dialog.current.showModal();
                gsap.fromTo('#modalform', { opacity: 0.3, duration: 0.4, scale: 0.9 }, { opacity: 1, scale: 1 })
            } else {
                gsap.to('#modalform', { opacity: 0, scale: 0.8, duration: 0.2, onComplete: () => dialog.current?.close() });
            }
        }
    }, [isModalOpened]);

    return createPortal(
        <dialog ref={dialog} >
            <div id='modalform' className='flex flex-col items-end z-10 md:w-[50vw] lg:w-[30vw]  w-[85vw] h-[80vh] justify-center dark:text-white '>
                <button onClick={closeModal}><IoCloseOutline size={30} /></button>
                <form className='bg-white w-full dark:bg-slate-900 p-4 shadow-xl rounded-lg flex flex-col gap-y-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="title">Title</label>
                        <input className='custom-input' maxLength={40}
                            type="text" id="title" value={title} onChange={updateTitle} />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="priority">Priority</label>
                        <select id="priority" className='select' value={priority} onChange={updatePriority}>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                            <option value={1}>Low</option>
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='description'>Description</label>
                        <input className='custom-input'
                            type="text" id="description" maxLength={300} value={notes} onChange={updateNotes} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='duedate'>Due Date</label>
                        <DatePicker
                            id='duedate'
                            placeholderText='29/02/2024...'
                            selected={dueDate ? new Date(dueDate) : null}
                            onChange={(date: Date | null) => updateDueDate(date)}
                            dateFormat="dd/MM/yyyy h:mm"
                            showTimeInput
                            minDate={new Date()}
                            minTime={minTime}
                            autoComplete="off"
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className='w-full flex justify-center'>
                        <button type='button'
                            onClick={action === 'add' ? handleTodoCreation : handleTodoUpdate}
                            className='simple-button' disabled={loading}  >{action === 'add' ? "Submit" : "Update"}</button>
                    </div>
                </form>
            </div>
        </dialog>,
        document.getElementById("modal")!
    );
}

export default Modal