<template>
  <v-container style="display:flex; height:100%; align-items:center; padding: 0;">
      <v-btn small tile title="Edit">
        <v-icon small color="green">mdi-pencil</v-icon>
      </v-btn>
      <v-btn small tile title="Clone">
        <v-icon small color="blue">mdi-content-copy</v-icon>
      </v-btn>
  </v-container>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "row-action-button-group",
  data: () => ({}),
  mounted() {},
  methods: {}
})
</script>
