<template>
  <v-btn-toggle v-model="filterId" dense title="quick status filter"> 
    <v-btn small tile value="1">
        <v-avatar color="red" size="22">{{error}}</v-avatar>
    </v-btn>
    <v-btn small tile value="2">
      <v-avatar color="grey" size="22">{{offline}}</v-avatar>
    </v-btn>
    <v-btn small tile value="3">
      <v-avatar color="success" size="22">{{online}}</v-avatar>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "filter-group",
  props: ['filterData'],
  data: () => ({
    status: [1,2,3],
    filterId: null,
    error: 0,
    offline: 0,
    online: 0,
  }),
  watch: {
    filterData(value) {
      const {error, offline, online} = value;
      this.error = error;
      this.offline = offline;
      this.online = online;
    },
    filterId(current, previous) {
      this.$emit('filter', Number(current));
    }
  }
}
</script>