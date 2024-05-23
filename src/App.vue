<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
export default {
  mounted() {
    localStorage.clear()
  }
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
