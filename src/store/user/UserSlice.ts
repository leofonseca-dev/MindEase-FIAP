import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserProfile = {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
};

type UserState = {
  profile: UserProfile;
};

const STORAGE_KEY = 'mindease.user.v1';

const loadFromStorage = (): Partial<UserState> | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<UserState>;
  } catch {
    return null;
  }
};

const saveToStorage = (state: UserState) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
};

const initialState: UserState = {
  profile: {
    name: 'Leonardo Fonseca',
    email: 'leoalfonseca@gmail.com',
    role: 'Desenvolvedor Front-end',
    avatarUrl: '/images/profile/user-1.jpg',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    hydrateUser(state) {
      const stored = loadFromStorage();
      if (stored) Object.assign(state, stored);
    },

    updateProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      state.profile = { ...state.profile, ...action.payload };
      saveToStorage(state);
    },
  },
});

export const { hydrateUser, updateProfile } = userSlice.actions;
export default userSlice.reducer;