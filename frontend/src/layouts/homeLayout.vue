<template>
  <v-app-bar color="primary" density="compact">
    <div class="container d-flex align-center">
      <v-toolbar-title class="cursor-pointer" @click="$router.push('/')"
        >Canteen Management System</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-badge color="white" :content="orderStore.cartCount" overlap offset-x="10" offset-y="10">
        <v-btn to="/cart" icon="mdi-cart"></v-btn>
      </v-badge>
    </div>
  </v-app-bar>
  <v-main>
    <div class="container">
      <RouterView />
    </div>
  </v-main>
</template>

<script setup>
import { useOrderStore } from '@/stores/order'
const orderStore = useOrderStore()
</script>
