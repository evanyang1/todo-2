import { create } from 'zustand';

const useUserStore = create((set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    isAuthenticated: () => get().user !== null,
}));

export default useUserStore;