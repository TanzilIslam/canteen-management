import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])

  const addToCart = (order) => {
    orders.value.push(order)
  }
  const removeFromCart = (orderId) => {
    orders.value = orders.value.filter((order) => order.id !== orderId)
  }
  const clearCart = () => {
    orders.value = []
  }
  const cartCount = computed(() => orders.value.length)
  
  const totalPrice = computed(() =>
    orders.value.reduce((total, order) => total + Number(order.price), 0),
  )
  return {
    orders,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    totalPrice,
  }
})
