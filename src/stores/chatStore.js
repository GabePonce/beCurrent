import { create } from 'zustand'

export const useChatStore = create((set)=>({
    chatId: null,
    type: null,
    changeChat: (chatId, type)=>{
        return set({
            chatId: chatId,
            type: type
        })
    }
}))