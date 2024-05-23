<script setup lang="ts">
import AddNewContact from '@/components/AddNewContact.vue'
</script>
<script lang="ts">
import type { ContactDto } from '@/types/ContactDto'
export default {
  data() {
    return {
      contacts: [] as ContactDto[],
      currentContact: {} as ContactDto
    }
  },
  async mounted() {
    this.fetchContacts()
  },
  methods: {
    showMoreInfo(contact: ContactDto) {
      document.querySelector('.wrapper-contact')?.classList.add('hidden')
      this.currentContact = contact
      document.querySelector('.wrapper-current-contact')?.classList.remove('hidden')
    },
    goToFullList() {
      this.fetchContacts()
      document.querySelector('.wrapper-contact')?.classList.remove('hidden')
      document.querySelector('.AddNew')?.classList.add('hidden')
      document.querySelector('.Update')?.classList.add('hidden')
      document.querySelector('.wrapper-current-contact')?.classList.add('hidden')
    },
    editContact() {
      document.querySelector('.wrapper-contact')?.classList.add('hidden')
      document.querySelector('.Update')?.classList.remove('hidden')
    },
    addNewContact() {
      document.querySelector('.wrapper-contact')?.classList.add('hidden')
      document.querySelector('.AddNew')?.classList.remove('hidden')
    },
    async dropContact() {
      const token = localStorage.getItem('token')
      if (token) {
        var answer = window.confirm('Czy na pewno checsz usunac ten kontakt?')
        if (answer) {
          try {
            const response = await fetch('https://localhost:7178/api/Contact/', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(this.currentContact.email)
            })
            this.goToFullList()
          } catch {
            alert('cos poszlo nie tak')
          }
        }
      } else alert('nie jestes zalogowany')
    },
    async fetchContacts() {
      try {
        const response = await fetch('https://localhost:7178/api/Contact', {
          method: 'GET'
        })
        const responseData: ContactDto[] = await response.json()
        this.contacts = responseData
        console.log(this.contacts)
      } catch {
        alert('cos poszlo nie tak')
      }
    }
  }
}
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="wrapper-contact">
        <div
          @click="showMoreInfo(contact)"
          v-for="contact in contacts"
          :key="String(contact.email)"
          class="contact"
        >
          <p>{{ contact.name }} {{ contact.surname }}</p>
          <p>{{ contact.email }}</p>
        </div>
      </div>
      <button @click="addNewContact">Dodaj nowy kontakt</button>
      <div class="wrapper-current-contact hidden">
        <p class="current-contact">{{ currentContact.name }} {{ currentContact.surname }}</p>
        <p class="current-contact">{{ currentContact.email }}</p>
        <p class="current-contact">{{ currentContact.password }}</p>
        <p class="current-contact">{{ currentContact.category }}</p>
        <p class="current-contact">{{ currentContact.subcategory }}</p>
        <p class="current-contact">{{ currentContact.phone }}</p>
        <p class="current-contact">{{ currentContact.dateOfBirth }}</p>
        <button @click="editContact">Edytuj kontakt</button>
        <button @click="goToFullList">Wróc do pełnej listy</button>
        <button @click="dropContact">Usuń kontakt</button>
      </div>
      <div class="AddNew hidden">
        <AddNewContact :parentFunction="goToFullList" />
        <button @click="goToFullList">Wróc do pełnej listy</button>
      </div>
      <div class="Update hidden">
        <AddNewContact :contactCurrent="currentContact" :key="String(currentContact.email)" />
        <button @click="goToFullList">Wróc do pełnej listy</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.wrapper-contact {
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 10%;
  flex-wrap: wrap;
}
.contact {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.hidden {
  display: none;
}
</style>
