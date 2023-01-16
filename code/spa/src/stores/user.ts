import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return {
      user: {},
      role: 'viewer',
      uid: ''
    }
  },
  getters: {
    current_user: (state) => state.user,
    logged_in: (state) => Object.keys(state.user).length !== 0,
    current_role: (state) => state.role,
    current_uid: (state) => state.user.uid,
    has_management_access: (state) => state.role=='logistics' || state.role=='admin' || state.role=='storage',
    has_logistics_access: (state) => state.role=='logistics' || state.role=='admin',
    has_storage_access: (state) => state.role=='admin' || state.role=='storage'
  },
  actions: {
    update(user: object) {
      this.user = user
    },
    update_role(role: string) {
      this.role = role
    },
    clear() {
      this.user = {},
      this.role = 'viewer',
      this.uid = ''
    },
  },
})
