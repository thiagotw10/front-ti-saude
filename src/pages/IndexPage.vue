<template>
  <div>
    <h1 style="font-size: 50px; text-align: center;">Seja bem vindo a TI SAÚDE</h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
window.localStorage.setItem('token_ti', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjAuMTA0OjgwODBcL2FwaVwvbG9naW4iLCJpYXQiOjE2ODY3MDgzNTAsImV4cCI6MTY4NzMxMzE1MCwibmJmIjoxNjg2NzA4MzUwLCJqdGkiOiJCUnhEcFgwdmVKNTJSYlZNIiwic3ViIjoxLCJwcnYiOiI0YTU2OGU0ZDM2NGEyMmRlY2FhYTJlMjNhM2Y3NDNmNzhhYWYxNTllIn0.Srj3gZonelNqby97jdXtLX0fO6P5URlwrAn2Vr3-pss')
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
