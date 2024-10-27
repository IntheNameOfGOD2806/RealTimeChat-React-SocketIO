import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	value:0,
	setValue: (value) => set({ value }),
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;