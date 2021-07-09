<template>
  <div>
    <v-btn small tile @click="onAdd">
      <v-icon small color="success">mdi-plus</v-icon>
      <span>Add</span>
    </v-btn>
    <v-btn :disabled="isRemoveDisabled" small tile @click="onRemove">
      <v-icon small color="red">mdi-delete</v-icon>
      <span>Remove</span>
    </v-btn>
    <v-btn small tile>
      <v-icon small color="blue">mdi-file-import</v-icon>
      <span>Import</span>
    </v-btn>
    <v-btn small tile @click="onExport">
      <v-icon small color="teal">mdi-file-export</v-icon>
      <span>Export</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "action-group",
  data: () => ({
    isRemoveDisabled: true,
  }),
  props: ['rowSelected'],
  methods: {
    onAdd() {
      this.$emit('filter', 'ADD');
    },
    onRemove() {
      this.$emit('remove', this.rowSelected);
    },
    onExport() {
      this.$emit('export', null);
    }
  },
  watch: {
      rowSelected(ids) {
        this.isRemoveDisabled = !ids.length;
      },
  }
}
</script>