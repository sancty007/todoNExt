import { configureStore } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définition des types
interface Task {
  id: number;
  title: string;
  description: string;
  isSelected: boolean;
}

interface User {
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string;
}

// Slice pour l'authentification
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: "",
  } as AuthState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = "";
    },
  },
});

// Slice pour les tâches
const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      return action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export const { setTasks, addTask, deleteTask, updateTask } = tasksSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
