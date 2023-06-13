<template>
  <div class="q-pa-md q-gutter-sm">
    <q-bar>
      <div class="cursor-pointer">File</div>
      <div class="cursor-pointer">Edit</div>
      <div class="cursor-pointer gt-xs">View</div>
      <div class="cursor-pointer gt-xs">Window</div>
      <div class="cursor-pointer">Help</div>
      <q-space />
      <q-btn dense flat icon="minimize" />
      <q-btn dense flat icon="crop_square" />
      <q-btn dense flat icon="close" />
    </q-bar>

    <q-bar class="bg-black text-white">
      <div class="cursor-pointer">File</div>
      <div class="cursor-pointer">Edit</div>
      <div class="cursor-pointer gt-xs">View</div>
      <div class="cursor-pointer gt-xs">Window</div>
      <div class="cursor-pointer">Help</div>
      <q-space />
      <q-btn dense flat icon="minimize" />
      <q-btn dense flat icon="crop_square" />
      <q-btn dense flat icon="close" />
    </q-bar>
  </div>
  <Modal-link />
  <p>Data: {{ data }}</p>
  <div>
    <q-link @click="redirectToNewPage">Voltar</q-link>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ModalLink from "components/ModalLink.vue";
import axios from "axios";

export default defineComponent({
  name: "NewPage",
  components: {
    ModalLink
  },
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    redirectToNewPage() {
      console.log("Clicou no link");
      this.$router.push("/");
    },
    fetchData() {
      let token = {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMy41OS4xODEuNjM6ODA4MFwvYXBpXC9sb2dpbiIsImlhdCI6MTY4NjYxNzEwMywiZXhwIjoxNjg2NjIwNzAzLCJuYmYiOjE2ODY2MTcxMDMsImp0aSI6InZ0ZUNzWEtRaVdZRHJQSkEiLCJzdWIiOjEsInBydiI6IjRhNTY4ZTRkMzY0YTIyZGVjYWFhMmUyM2EzZjc0M2Y3OGFhZjE1OWUifQ.F0iv2IS88UIibkXCLMs_hTSUBsRfy-HQ_Vcs8fHGwmA`,
        },
      };
      axios
        .post(
          "http://13.59.181.63:8080/api/medicos/listar",
          {
            registro_por_pagina: 10,
          },
          token
        )
        .then((response) => {
          // Atualize o estado de `data` com os dados da resposta
          this.data = response.data.data;
          console.log(this.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
</script>
