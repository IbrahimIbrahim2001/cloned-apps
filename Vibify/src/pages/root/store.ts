import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserState = {
    user: {
        displayName: string;
        email: string;
        name: string;
        phone?: string;
    };
    setUserData: (data: Partial<UserState['user']>) => void;
};

export const useUserData = create(
    persist<UserState>(
        (set) => ({
            user: {
                displayName: '',
                email: '',
                name: '',
                phone: undefined,
            },
            setUserData: (data) => set((state) => ({
                user: { ...state.user, ...data }
            })),
        }),
        {
            name: "userData-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);