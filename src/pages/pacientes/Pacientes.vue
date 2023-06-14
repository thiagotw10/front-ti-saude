<template>
  <div class="q-pa-md q-gutter-sm">
    <TabelaLink :dados="data" titulo="Pacientes" :coluna="coluna"/>
    <div style="display: flex; justify-content:flex-end;" class="q-pa-md">
      <q-btn style="margin: 0 5px;" label="Voltar" color="primary" @click="redirectToNewPage" />
      <q-btn label="Novo paciente" color="primary" @click="redirectToCreate" />
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
  { name: 'data', align: 'center', label: 'Data nascimento', field: 'data', sortable: true },
  { name: 'telefone', label: 'Telefone', field: 'telefone', sortable: true },
]

export default defineComponent({
  name: "PaciEntes",
  components: {
    TabelaLink
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
      this.$router.push("/pacientes/create");
    },
    fetchData() {
      let token = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token_ti')}`,
        },
      };
      axios
        .post(
          "http://192.168.0.104:8080/api/pacientes/listar",
          {
            registro_por_pagina: 10,
          },
          token
        )
        .then((response) => {
          const newData = response.data.data.map((value) => {
            return {
              name: value.pac_nome,
              data: value.pac_dataNascimento,
              telefone: value.pac_telefone
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
