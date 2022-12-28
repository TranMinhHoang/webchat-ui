const { createSlice } = require('@reduxjs/toolkit');

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversations: null,
    },
    reducers: {
        // getConversation: (state, action) => {
        //     if (!state?.conversations?.[Number(action.payload.id).toString()])
        //         state.conversations[Number(action.payload.id).toString()] = [];
        //     state.conversations[Number(action.payload.id).toString()].push(
        //         action.payload.message,
        //     );
        // },
        createConversation: (state, currentUser, userList) => {
            // action.payload.forEach((payload, prev) => {
            //     // state.conversations: {
            //     //     ...state.conversations,
            //     //     [Number(payload.id)] : []
            //     // }
            //     if (payload.id !== user.id){
            //         console.log(payload);
            //     }
            // });
        },
    },
});

export const { createConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
