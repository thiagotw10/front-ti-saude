<template>
  <div class="q-pa-md">
    <q-table
      :title="titulo"
      :rows="linhas"
      :columns="coluna"
      row-key="id"
      :loading="isLoading"
    >
      <template v-slot:body-cell-acoes="props">
        <div class="text-center">
          <q-btn @click="redirecionarRota(props.row.id)" label="Editar" />
          <q-btn @click="fazerRequisicao(props.row.id)" :label="labelDinamic" />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "TabelaLink",
  props: {
    dados: Object,
    coluna: Object,
    linha: Object,
    titulo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      labelDinamic: "Deletar",
    };
  },
  methods: {
    redirecionarRota(id) {
      this.$emit("enviar-edit", id);
    },
    fazerRequisicao(id) {
      this.$emit("enviar-funcao", id);
    },
  },
  computed: {
    linhas() {
      if (this.dados) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isLoading = false;
        return this.dados;
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isLoading = true;
        return [];
      }
    },
  },
  setup() {
    return {};
  },
});
</script>
