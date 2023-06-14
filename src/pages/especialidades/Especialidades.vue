<template>
  <div class="q-pa-md q-gutter-sm">
    <TabelaLink :dados="data" titulo="Especialidades" :coluna="coluna" />
    <div style="display: flex; justify-content:flex-end;" class="q-pa-md">
      <q-btn style="margin: 0 5px;" label="Voltar" color="primary" @click="redirectToNewPage" />
      <q-btn label="Nova especialidade" color="primary" @click="redirectToCreate" />
    </div>
  </div>

</template>

<script>
import { defineComponent } from "vue";
import ModalLink from "components/ModalLink.vue";
import TabelaLink from "components/TabelaLink.vue";
import axios from "axios";

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
]



export default defineComponent({
  name: "especialidadeS",
  components: {
    TabelaLink
  },
  props: {

  },
  data() {
    return {
      data: null,
      coluna: columns,
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
    redirectToCreate(){
      this.$router.push("/especialidades/create");
    },
    fetchData() {
      let token = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token_ti')}`,
        },
      };
      axios
        .post(
          "http://192.168.0.104:8080/api/especialidades/listar",
          {
            registro_por_pagina: 10,
          },
          token
        )
        .then((response) => {
          // Atualize o estado de `data` com os dados da resposta

          const newData = response.data.data.map((value) => {
            return {
              name: value.espec_nome,
            };
          });

          this.data = newData

          console.log(newData);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
</script>
