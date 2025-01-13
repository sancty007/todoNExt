// redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

// Slice pour gérer les informations utilisateur
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: ''
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logoutUser: (state) => {
      state.user = null
      state.token = ''
    }
  }
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [
    { id: 1, title: "Tâche 1", description: "Description de la tâche 1", },

  ],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload)
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload)
    },
    updateTask: (state, action) => {
      const taskIndex = state.findIndex((task) => task.id === action.payload.id)
      if (taskIndex >= 0) {
        state[taskIndex] = action.payload
      }
    }
  }
})

export const { loginUser, logoutUser } = authSlice.actions
export const {  addTask, deleteTask, updateTask } = tasksSlice.actions

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tasks: tasksSlice.reducer
  }
})
