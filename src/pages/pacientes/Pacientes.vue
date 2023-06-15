<template>
  <div class="q-pa-md q-gutter-sm" style="position: relative">
    <TabelaLink
      :dados="data"
      titulo="Pacientes"
      :coluna="coluna"
      @enviar-funcao="deletar"
      @enviar-edit="redirectEditar"
    />
    <div style="display: flex; justify-content: flex-end" class="q-pa-md">
      <q-btn
        style="margin: 0 5px"
        label="Voltar"
        color="primary"
        @click="redirectToNewPage"
      />
      <q-btn label="Novo paciente" color="primary" @click="redirectToCreate" />
    </div>
    <div
      v-if="isLoading"
      style="
        width: 95%;
        height: 50vh;
        position: absolute;
        top: 0;
        z-index: 99999999;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <q-spinner-hourglass color="purple" size="4em" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ModalLink from "components/ModalLink.vue";
import TabelaLink from "components/TabelaLink.vue";
import axios from "axios";
import { url } from "src/urlApi";

const columns = [
  {
    name: "name",
    required: true,
    label: "Nome",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "data",
    align: "center",
    label: "Data nascimento",
    field: "data",
    sortable: true,
  },
  { name: "telefone", label: "Telefone", field: "telefone", sortable: true },
  {
    name: "acoes",
    label: "Ações",
    field: "acoes",
    sortable: false,
    align: "center",
  },
];

export default defineComponent({
  name: "PaciEntes",
  components: {
    TabelaLink,
  },
  data() {
    return {
      data: null,
      coluna: columns,
      isLoading: false,
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
    redirectToCreate() {
      this.$router.push("/pacientes/create");
    },
    redirectEditar(id) {
      this.$router.push({ path: "/pacientes/editar/" + id });
    },
    deletar(id) {
      this.isLoading = true;
      let token = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token_ti")}`,
        },
      };
      axios
        .delete(`${url}api/pacientes/${id}`, token)
        .then((response) => {
          this.fetchData();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchData() {
      let token = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token_ti")}`,
        },
      };
      axios
        .post(
          `${url}api/pacientes/listar`,
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
              telefone: value.pac_telefone,
              id: value.pac_codigo,
            };
          });

          this.data = newData;
          this.isLoading = false
        })
        .catch((error) => {
          if (error.response.status) {
            localStorage.clear("token_ti");
            this.$router.push("/");
          }
          console.error(error);
        });
    },
  },
});
</script>
