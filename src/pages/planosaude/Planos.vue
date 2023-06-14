<template>
  <div class="q-pa-md q-gutter-sm">
    <TabelaLink :dados="data" titulo="Planos de saúde" :coluna="coluna" />
    <div style="display: flex; justify-content:flex-end;" class="q-pa-md">
      <q-btn style="margin: 0 5px;" label="Voltar" color="primary" @click="redirectToNewPage" />
      <q-btn label="Novo plano" color="primary" @click="redirectToCreate" />
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
  { name: 'telefone', align: 'center', label: 'Telefone', field: 'telefone', sortable: true },
]



export default defineComponent({
  name: "PlanoS",
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
      this.$router.push("/planosSaude/create");
    },
    fetchData() {
      let token = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token_ti')}`,
        },
      };
      axios
        .post(
          "http://192.168.0.104:8080/api/planosaude/listar",
          {
            registro_por_pagina: 10,
          },
          token
        )
        .then((response) => {
          // Atualize o estado de `data` com os dados da resposta

          const newData = response.data.data.map((value) => {
            return {
              name: value.plano_descricao,
              telefone: value.plano_telefone,
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
