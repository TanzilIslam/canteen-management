<script setup>
import { useOrderStore } from '@/stores/order'
import { useAppStore } from '@/stores/app'
const orderStore = useOrderStore()
const app = useAppStore()

const foods = [
  {
    id: 1,
    title: 'Chicken Biriyani',
    description: 'Fragrant rice with meat, saffron & spices.',
    price: '250',
    image:
      'https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 2,
    title: 'Mutton Biriyani',
    description: 'Special biriyani with mutton cooked in layers of rice.',
    price: '350',
    image:
      'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJpcnlhbml8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    title: 'Tehari',
    description: 'Rice cooked with beef and aromatic spices.',
    price: '180',
    image:
      'https://media.istockphoto.com/id/1292442851/photo/traditional-hyderabadi-vegetable-veg-dum-biryani-with-mixed-veggies-served-with-mixed-raita.webp?a=1&b=1&s=612x612&w=0&k=20&c=YTQkdUfr2PCncJmxsaijhxi2xQ7gtfQFB5_EGmC1NF4=',
  },
  {
    id: 4,
    title: 'Chicken Curry',
    description: 'Tender chicken cooked with onion, garlic & spices.',
    price: '150',
    image:
      'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGN1cnJ5fGVufDB8fDB8fHww',
  },

  {
    id: 5,
    title: 'Ilish Curry',
    description: 'Hilsa fish cooked in mustard gravy.',
    price: '400',
    image:
      'https://media.istockphoto.com/id/2164862681/photo/sorshe-illish-or-hilsa-fish-curry.jpg?s=2048x2048&w=is&k=20&c=PxWU0E_J0MTHVnE6MTfbC3E-emGdZjVvMMDYFY8qf_I=',
  },
  {
    id: 6,
    title: 'Paratha & Beef Bhuna',
    description: 'Crispy paratha with spicy beef bhuna.',
    price: '140',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqopRpQjHVdJu-OkDiLyz9zcmbJSV3ocJv1Q&s',
  },
  {
    id: 7,
    title: 'Fuchka',
    description: 'Crispy puri filled with spiced potato & tamarind water.',
    price: '80',
    image:
      'https://www.shutterstock.com/shutterstock/photos/2303308473/display_1500/stock-photo-fuchka-or-pani-puri-and-gol-gappay-with-sour-water-served-in-dish-isolated-on-table-top-view-of-2303308473.jpg',
  },
  {
    id: 8,
    title: 'Mishti Doi',
    description: 'Traditional sweet yogurt of Bogura.',
    price: '60',
    image:
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR3rwlhHlK-J5_LlvlDgbZlpKNmpIpDCYe72H_6ebH8Y3GV3NgT',
  },
]

const addToCart = (food) => {
  app.showSnackbar({ text: `Added ${food.title} to cart`, color: 'success' })
  orderStore.addToCart(food)
}
</script>

<template>
  <v-row>
    <v-col v-for="(food, index) in foods" :key="index" cols="12" sm="6" md="4">
      <v-card height="100%" width="100%">
        <v-img :src="food.image" height="300px" cover></v-img>
        <v-card-title>{{ food.title }}</v-card-title>
        <v-card-text>
          {{ food.description }}
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <p class="text-h6 font-weight-bold">{{ food.price }} /- BDT</p>
          <v-spacer></v-spacer>
          <v-btn color="primary" size="small" variant="elevated" @click="addToCart(food)"
            >Order Now</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
