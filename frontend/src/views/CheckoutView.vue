<template>
  <div class="checkout-form">
    <v-card class="pa-4">
      <v-card-title class="">Checkout : {{ orderStore.totalPrice }} /- BDT</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onConfirmOrder" ref="formRef">
          <v-text-field
            v-model="name"
            label="Name"
            required
            :rules="[(v) => !!v || 'Name is required']"
            class="mb-4"
          ></v-text-field>
          <v-text-field
            v-model="phone"
            label="Phone"
            required
            :rules="[(v) => !!v || 'Phone is required']"
            class="mb-4"
          ></v-text-field>
          <v-textarea
            v-model="address"
            label="Address"
            required
            :rules="[(v) => !!v || 'Address is required']"
            class="mb-4"
          ></v-textarea>
          <v-divider></v-divider>
          <v-btn color="primary" block variant="elevated" type="submit">Confirm Order</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { useOrderStore } from '@/stores/order'
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'

const app = useAppStore()
const orderStore = useOrderStore()
const router = useRouter()

const formRef = ref(null)
const name = ref('')
const phone = ref('')
const address = ref('')

const onConfirmOrder = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  app.showSnackbar({ text: 'Order confirmed', color: 'success' })
  orderStore.clearCart()
  name.value = ''
  phone.value = ''
  address.value = ''
  formRef.value.reset()
  router.push('/')
}
</script>
<style scoped>
.checkout-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
