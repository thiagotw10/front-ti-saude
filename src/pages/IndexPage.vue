<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >

  </q-page>
  <div>
    <q-link to="/new" @click="redirectToNewPage">Ir para outra rota</q-link>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  methods: {
    redirectToNewPage() {
      console.log('Clicou no link');
      this.$router.push('/new');
    }
  }
})
</script>
