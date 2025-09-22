import { create } from 'zustand';

// Initialize user from localStorage if available
const getInitialUser = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
};

const useUserStore = create((set, get) => ({
    user: getInitialUser(),
    setUser: (user) => {
        set({ user });
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    },
    clearUser: () => {
        set({ user: null });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },
    isAuthenticated: () => get().user !== null,
}));

export default useUserStore;