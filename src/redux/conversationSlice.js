const { createSlice } = require('@reduxjs/toolkit');

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        count: '1',
        conversations: {
            1: ['1111'],
        },
    },
    reducers: {
        getConversation: (state, action) => {
            if (!state?.conversations?.[Number(action.payload.id).toString()])
                state.conversations[Number(action.payload.id).toString()] = [];
            state.conversations[Number(action.payload.id).toString()].push(
                action.payload.message,
            );
        },
    },
});

export const { getConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
