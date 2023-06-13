<template>
  <div class="q-pa-md q-gutter-sm">
    <TabelaLink :dados="data" titulo="Pacientes" :coluna="coluna"/>
    <div>
      <q-btn label="Voltar" color="primary" @click="redirectToNewPage" />
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
    fetchData() {
      let token = {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMy41OS4xODEuNjM6ODA4MFwvYXBpXC9sb2dpbiIsImlhdCI6MTY4NjYzMDQ1MiwiZXhwIjoxNjg2NjM0MDUyLCJuYmYiOjE2ODY2MzA0NTIsImp0aSI6IkpGQ3I4TUdvNnJwZ1B5MTkiLCJzdWIiOjEsInBydiI6IjRhNTY4ZTRkMzY0YTIyZGVjYWFhMmUyM2EzZjc0M2Y3OGFhZjE1OWUifQ.xZevTbZpHtrUFcLshsUp13nbKNkCm4Jwn2yq7nYusSc`,
        },
      };
      axios
        .post(
          "http://13.59.181.63:8080/api/pacientes/listar",
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
