<script lang="ts">
import type { ContactDto } from '@/types/ContactDto'
export default {
  props: {
    contactCurrent: Object as () => ContactDto,
    parentFunction: Function
  },
  data() {
    return {
      contact: {} as ContactDto,
      isEditing: false
    }
  },
  mounted() {
    console.log(this.contactCurrent)
    if (this.contactCurrent) {
      this.contact = { ...this.contactCurrent }
      this.isEditing = true
    } else this.isEditing = false
  },
  methods: {
    async addContact() {
      const token = localStorage.getItem('token')
      if (token != null) {
        try {
          console.log('Sending contact data:', JSON.stringify(this.contact))
          const response = await fetch('https://localhost:7178/api/Contact/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(this.contact)
          })

          console.log('Response status:', response.status)
          if (response.ok) {
            console.log('Response data:', response)
            alert('dodano kontakt')
            this.parentFunction
          } else {
            console.error('Server error:', response.statusText)
            alert('cos poszlo nie tak')
          }
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error)
          alert('cos poszlo nie tak')
        }
      } else {
        alert('nie jestes zalogowany :(')
      }
    },
    async editContact() {
      const token = localStorage.getItem('token')
      if (token != null) {
        try {
          console.log('Sending contact data:', JSON.stringify(this.contact))
          const response = await fetch('https://localhost:7178/api/Contact/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(this.contact)
          })

          console.log('Response status:', response.status)
          if (response.ok) {
            alert('zedytowano kontakt')
            this.parentFunction
          } else {
            console.error('Server error:', response.statusText)
            alert('cos poszlo nie tak')
          }
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error)
          alert('cos poszlo nie tak')
        }
      } else {
        alert('nie jestes zalogowany :(')
      }
    }
  }
}
</script>
<template>
  <div class="wrapper">
    <form @submit.prevent="isEditing ? editContact() : addContact()">
      <input required v-model="contact.name" type="text" placeholder="Imie" />
      <input required v-model="contact.surname" type="text" placeholder="Nazwisko" />
      <input
        :disabled="isEditing"
        required
        v-model="contact.email"
        type="text"
        placeholder="Email"
      />
      <input required v-model="contact.password" type="text" placeholder="Haslo" />
      <select required v-model="contact.category">
        <option value="business">Biznesowy</option>
        <option value="private">Prywatny</option>
        <option selected value="other">Inny</option>
      </select>
      <input v-model="contact.subcategory" v-if="contact.category == 'other'" type="text" />
      <input v-model="contact.subcategory" v-else-if="contact.category == 'private'" type="text" />
      <select v-else required v-model="contact.subcategory">
        <option value="Szef">Szef</option>
        <option value="Podwladny">Podwładny</option>
        <option value="Stazysta">Stażysta</option>
      </select>
      <input required v-model="contact.phone" type="text" maxlength="9" placeholder="Telefon" />
      <input required v-model="contact.dateOfBirth" type="text" placeholder="Data urodzenia" />
      <input type="submit" :value="isEditing ? 'Aktualizuj kontakt!' : 'dodaj kontakt'" />
    </form>
  </div>
</template>
