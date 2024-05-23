import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoggedStore = defineStore('counter', () => {
  const logged = ref(false)
  function setLogged(value: boolean) {
    logged.value = value
  }
  return { logged, setLogged }
})
