import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../interfaces/messageInterface";



const messagesSlice = createSlice({
    name: "message",
    initialState: [] as Message[],
    reducers: {
        sendMessage: (state, action: PayloadAction<Message>) => {
            state.push(action.payload)

        }
    },

})


export default messagesSlice.reducer;

export const { sendMessage } = messagesSlice.actions;