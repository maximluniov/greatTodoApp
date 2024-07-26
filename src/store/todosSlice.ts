import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TodoItem } from "../interfaces/todoInterface";

export type SortBy = "Date"|"Priority"|"Due date";


export interface InitialState {
    data: TodoItem[],
    loading:boolean,
    sortBy:SortBy
}

const initialState: InitialState = {
    data: [],
    loading:true,
    sortBy:'Date'
}


const todosSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TodoItem>) => {
            state.data.push(action.payload)
            state.loading=false;
        },
        removeTodo: (state, action: PayloadAction<TodoItem["id"]>) => {
            const updated = state.data.filter((todo) => {
                return todo.id !== action.payload
            })
            state.data = updated;
            state.loading=false;
        },
        updateTodo: (state, action: PayloadAction<TodoItem>) => {
            const updated = state.data.filter((todo) => {
                return todo.id !== action.payload.id
            })
            updated.push(action.payload)
            state.data = updated;
            state.loading=false;
        },
        setTodos:(state, action: PayloadAction<TodoItem[]>)=>{
            state.data=action.payload;
            state.loading=false;
        },
        startLoading:(state)=>{
            state.loading=true
        },
        changeSortBy:(state,action: PayloadAction<SortBy>)=>{
            state.sortBy=action.payload;
        }
    },
    
})





export default todosSlice.reducer;

export const { addTodo, removeTodo, updateTodo,setTodos,startLoading,changeSortBy } = todosSlice.actions;

