import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return {
      user: {}
    }
  },
  getters: {
    current_user: (state) => state.user,
    logged_in: (state) => Object.keys(state.user).length !== 0
  },
  actions: {
    update(user: object) {
      this.user = user
    },
  },
})