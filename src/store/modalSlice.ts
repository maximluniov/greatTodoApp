import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TodoItem } from "../interfaces/todoInterface";
import { addTodo, updateTodo } from "./todosSlice";

export interface InitialState {
    isModalOpened: boolean,
    form: TodoItem,
    action: 'update' | 'add'
}
 
const initialState: InitialState = {
    isModalOpened: false,
    form: {
        title: "",
        priority: 2,
        id: "",
        dueDate: null,
        creationDate: "",
        status: false,
        notes: ""
    },
    action: 'add'
}


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleModal: (state) => {
            if (state.action === 'update') {
                state.form = initialState.form;
                state.action='add'
            }
            state.isModalOpened = !state.isModalOpened
        },
        changeTitle: (state, action: PayloadAction<TodoItem["title"]>) => {
            state.form.title = action.payload;
        },
        changePriority: (state, action: PayloadAction<TodoItem['priority']>) => {
            state.form.priority = action.payload;
        },
        changeDueDate: (state, action: PayloadAction<TodoItem["dueDate"]>) => {
            state.form.dueDate = action.payload;
        },
        changeNotes: (state, action: PayloadAction<TodoItem["notes"]>) => {
            state.form.notes = action.payload;
        },
        setForm: (state, action: PayloadAction<TodoItem>) => {
            state.action = 'update';
            state.form = action.payload;
            state.isModalOpened = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase((addTodo), (state) => {
            state.isModalOpened = false;
            state.form = initialState.form;
        })
        builder.addCase((updateTodo), (state) => {
            state.isModalOpened = false;
            state.form = initialState.form;
        })
    }


})


export default modalSlice.reducer;

export const { toggleModal, setForm, changeTitle, changePriority, changeDueDate, changeNotes } = modalSlice.actions;