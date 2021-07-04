<template>
  <v-container style="display:flex; height:100%; align-items:center; padding: 0;">
    <v-switch dense
        :color=color
        :loading=loading
        readonly
        @click="onClickEvent"
        v-model="enabled"
        inset
      ></v-switch>
  </v-container>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "available-indicator",
  data: () => ({
    color: null,
    enabled: true,
    loading: false,
  }),
  mounted() {
    this.enabled = this.params.node.data.enabled;
    this.loading = this.params.value === 4;
    this.color = this.params.value === 3 ? 'green' : 'red'; 
  },
  methods: {
    onClickEvent() {
      const {context, node} = this.params;
      context.componentParent.onToggle({
        id: node.data.id,
        enabled: !this.enabled
      });
    }
  }
})
</script>
