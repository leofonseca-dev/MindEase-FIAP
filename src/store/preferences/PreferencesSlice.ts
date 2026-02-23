import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ComplexityLevel = 1 | 2 | 3;
export type ContrastMode = 'NORMAL' | 'HIGH';
export type SpacingScale = 1 | 2 | 3;
export type FontScale = 1 | 2 | 3;

type Needs = {
  adhd: boolean;
  autism: boolean;
  dyslexia: boolean;
  anxiety: boolean;
  sensoryOverload: boolean;
};

type Routine = {
  bestTimeOfDay: 'MORNING' | 'AFTERNOON' | 'NIGHT';
  breakReminder: boolean;
};

type NeedsKey = keyof Needs;
type RoutineKey = keyof Routine;


export type PreferencesState = {
  complexityLevel: ComplexityLevel;
  focusMode: boolean;
  summaryMode: boolean;
  reduceMotion: boolean;
  hideSensitiveValues: boolean;

  contrastMode: ContrastMode;
  spacingScale: SpacingScale;
  fontScale: FontScale;
  needs: Needs;
  routine: Routine;
};




const STORAGE_KEY = 'mindease.preferences.v1';

const loadFromStorage = (): Partial<PreferencesState> | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<PreferencesState>;
  } catch {
    return null;
  }
};

const saveToStorage = (state: PreferencesState) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
};

const initialState: PreferencesState = {
  complexityLevel: 3,
  focusMode: false,
  summaryMode: false,
  reduceMotion: false,
  hideSensitiveValues: false,

  contrastMode: 'NORMAL',
  spacingScale: 2,
  fontScale: 2,
  needs: {
    adhd: false,
    autism: false,
    dyslexia: false,
    anxiety: false,
    sensoryOverload: false,
  },
  routine: {
    bestTimeOfDay: 'MORNING',
    breakReminder: false,
  },
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    hydratePreferences(state) {
      const stored = loadFromStorage();
      if (stored) Object.assign(state, stored);
    },

    setComplexityLevel(state, action: PayloadAction<ComplexityLevel>) {
      state.complexityLevel = action.payload;
      saveToStorage(state);
    },

    toggleFocusMode(state) {
      state.focusMode = !state.focusMode;

      if (state.focusMode) {
        state.summaryMode = true;
        state.reduceMotion = true;
        state.contrastMode = 'NORMAL';
        state.spacingScale = 3;
        state.fontScale = 3;
      }

      saveToStorage(state);
    },

    toggleSummaryMode(state) {
      state.summaryMode = !state.summaryMode;
      saveToStorage(state);
    },

    toggleReduceMotion(state) {
      state.reduceMotion = !state.reduceMotion;
      saveToStorage(state);
    },

    toggleHideSensitiveValues(state) {
      state.hideSensitiveValues = !state.hideSensitiveValues;
      saveToStorage(state);
    },

    setContrastMode(state, action: PayloadAction<ContrastMode>) {
      state.contrastMode = action.payload;
      saveToStorage(state);
    },

    setSpacingScale(state, action: PayloadAction<SpacingScale>) {
      state.spacingScale = action.payload;
      saveToStorage(state);
    },

    setFontScale(state, action: PayloadAction<FontScale>) {
    state.fontScale = action.payload;
    saveToStorage(state);
  },

  
  setNeed(state, action: PayloadAction<{ key: NeedsKey; value: boolean }>) {
    state.needs[action.payload.key] = action.payload.value;
    saveToStorage(state);
  },

  setRoutine(state, action: PayloadAction<{ key: RoutineKey; value: Routine[RoutineKey] }>) {
    // @ts-expect-error ok: assignment via indexed access
    state.routine[action.payload.key] = action.payload.value;
    saveToStorage(state);
  },
  },
});

export const {
  hydratePreferences,
  setComplexityLevel,
  toggleFocusMode,
  toggleSummaryMode,
  toggleReduceMotion,
  toggleHideSensitiveValues,
  setContrastMode,
  setSpacingScale,
  setFontScale,
  setNeed,
  setRoutine,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;