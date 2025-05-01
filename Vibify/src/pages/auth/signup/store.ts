import { createJSONStorage, persist } from 'zustand/middleware';
import { OnboardingSchema } from '@/features/signup (onboarding)/schema';
import { create } from 'zustand'

type OnboardingState = Partial<OnboardingSchema> & {
    setData: (data: Partial<OnboardingSchema>) => void;
};

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            setData: (data) => set(data),
        }),
        {
            name: "onboarding-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);