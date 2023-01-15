import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return {
      user: {}
    }
  },
  getters: {
    current_user: (state) => state.user,
  },
  actions: {
    update(user: object) {
      this.user = user
    },
  },
})