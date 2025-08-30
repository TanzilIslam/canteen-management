<template>
  <div class="d-flex justify-space-between align-center">
    <h1>Your Total : {{ orderStore.totalPrice }} /- BDT</h1>
    <v-btn
      color="primary"
      :to="'/checkout'"
      append-icon="mdi-arrow-right"
      :disabled="orderStore.orders.length === 0"
      >Confirm Order</v-btn
    >
  </div>
  <v-data-table :headers="headers" :items="orderStore.orders">
    <template v-slot:item.image="{ item }">
      <v-img :src="item.image" height="100" width="100" cover class="ma-2 rounded-lg"></v-img>
    </template>
    <template v-slot:item.price="{ item }"> {{ item.price }} /- BDT </template>
    <template v-slot:item.actions="{ item }">
      <v-btn size="x-small" text icon="mdi-delete" @click="onRemove(item)"></v-btn>
    </template>
  </v-data-table>
</template>
<script setup>
import { useOrderStore } from '@/stores/order'
import { useAppStore } from '@/stores/app'
const orderStore = useOrderStore()
const app = useAppStore()
const headers = [
  { title: 'Image', key: 'image', align: 'start' },
  { title: 'Title', key: 'title', align: 'start' },
  { title: 'Price', key: 'price', align: 'end' },
  { title: 'Actions', key: 'actions', align: 'end' },
]
const onRemove = async (item) => {
  const confirmed = await app.showConfirmDialog({
    title: 'Remove from cart',
    message: `Are you sure you want to remove ${item.title} from cart?`,
    confirmText: 'Remove',
    cancelText: 'Cancel',
  })
  if (confirmed) {
    orderStore.removeFromCart(item.id)
    app.showSnackbar({ text: `${item.title} removed from cart`, color: 'success' })
  }
}
</script>
