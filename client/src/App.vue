<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h2>LiveBeat</h2>
      <v-spacer></v-spacer>

      <v-btn to="/" text>
        <v-icon>mdi-home</v-icon>
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn to="/about" text>
        <v-icon>mdi-information</v-icon>
        <span class="mr-2">About</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style lang="scss">
@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-material.css";
</style>
