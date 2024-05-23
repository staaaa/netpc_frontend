<script lang="ts">
import { useLoggedStore } from '@/stores/logged'

export default {
  setup() {
    const logged = useLoggedStore()

    return {
      logged
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.logged.setLogged(true)
    }
    if (this.logged.logged) {
      alert('Jesteś już zalogowany!')
      this.$router.push('/contacts')
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async register() {
      const response = await fetch('https://localhost:7178/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
      const responseData = await response.json()
      localStorage.setItem('token', responseData.token)
      this.logged.setLogged(true)
      this.$router.push('/contacts')
    }
  }
}
</script>
<template>
  <main>
    <div class="login-wrapper">
      <form @submit.prevent="register" method="post">
        <input type="text" v-model="username" placeholder="Login..." />
        <input type="password" v-model="password" name="password" placeholder="Hasło..." />
        <input type="submit" value="ZAREJESTRUJ SIĘ" />
        <a href="/">Masz już konto? Zaloguj się!</a>
      </form>
    </div>
  </main>
</template>

<style scoped>
.login-wrapper form {
  display: flex;
  flex-direction: column;
}
input {
  margin: 20px;
}
</style>
