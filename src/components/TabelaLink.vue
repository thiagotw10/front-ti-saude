<template>
  <div class="q-pa-md">
    <q-table
      :title="titulo"
      :rows="linhas"
      :columns="coluna"
      row-key="name"
      :loading="isLoading"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TabelaLink',
  props: {
    dados: Object,
    coluna: Object,
    linha: Object,
    titulo: {
      type: String,
      required: true
    },
  },
  data(){
    return {
      isLoading: false
    }
  },
  computed: {
    linhas() {
      if (this.dados) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isLoading = false
        return this.dados
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isLoading = true
        return [];
      }
    }
  },
  setup () {
    return {

    }
  }
})
</script>
