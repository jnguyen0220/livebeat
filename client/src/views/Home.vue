<template>
    <v-card>
      <a hidden ref="download_btn" />
      <v-app-bar outlined tile> 
        <v-container fluid>
        <v-row no-gutters class="font-weight-light">
          <v-col>
            <span>Action</span>
          </v-col>
          <v-col>
            <span>Status Filter</span>
          </v-col>
          <v-col>
            <span>Global Filter</span>
          </v-col>
          <v-col style="text-align: right;">
            <span>Clients</span>
          </v-col>
          <v-col style="text-align: right;">
            <span>Online Since</span>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col align-self="center">
            <action-group @filter="onActionChange" @remove="onRemove" @export="onExport" @import="onImport" :rowSelected="rowSelected"></action-group>
          </v-col>
           <v-col align-self="center">
            <filter-group :filterData="filterData" @filter="onFilterChange"></filter-group>
          </v-col>
           <v-col align-self="center">
            <v-text-field v-model="globalFilter" clearable dense hide-details="auto" prepend-inner-icon="mdi-magnify">
            </v-text-field>
          </v-col>
          <v-col style="text-align: right;">
            <span>{{clients}}</span>
          </v-col>
          <v-col style="text-align: right;">
            <span>{{online_since}}</span>
          </v-col>
        </v-row>
        </v-container>
      </v-app-bar>
      <grid :action="action" :filterStatus="filterStatus" :globalFilter="globalFilter" @disabled-row="onRowDisabled" @row-selected="onRowSelected" @filter-data="onGridFilter"></grid>
      <messenger @on-message="onMessage" :send="sendMessage"></messenger>
      <job-form :dialog="isOpen" @action="onFormSave"></job-form>
    </v-card>
</template>

<script>
  import Grid from '@/components/Grid';
  import FilterGroup from '@/components/FilterGroup';
  import Vue from 'vue'
  import ActionGroup from '@/components/ActionGroup';
  import Messenger from '@/components/Messenger.vue';
  import JobForm from '@/components/JobForm.vue';
  import dayjs from "@/dayjs";
  import {v4 as uuidv4} from "uuid";

  export default Vue.extend({
  components: { Grid, FilterGroup, ActionGroup, Messenger, JobForm },
    data: () => ({
      action: null,
      sendMessage: null,
      filterStatus: null,
      online_since: null,
      clients: 0,
      filterData: null,
      rowSelected: [],
      isOpen: false,
      globalFilter: null
    }),
    render() {
      return []
    },
    methods: {
      onFilterChange(event) {
        console.log(event);
        this.filterStatus = event;
      },
      onFormSave(event) {
        const {action, ...rest} = event;
        switch(action){
          case "ADD":
            this.sendMessage = {type: action.toLowerCase(), message: rest}; 
            break;
        }
      },
      onActionChange(event) {
        switch(event) {
          case "ADD":
            this.isOpen = uuidv4();
            break;
        }
        console.log(event);
      },
      onGridFilter(event) {
        this.filterData = { 
          error: event.get(1) || 0,
          offline: event.get(2) || 0,
          online: event.get(3) || 0
        }
      },
      onMessage({type, message: _message}) {
        switch(type) {
          case "welcome":
            const { online_since, message } = _message;
            this.online_since = dayjs(online_since).format('LLL');
            this.action = {type: 'load', message};
            break;
          case "add":
            this.action = {type: 'add', message: _message};
            break;
          case "result":
            this.action = {type: 'update', message: _message };
            break;
          case "disabled":
            this.action = {type: 'disabled', message: _message };
            break;
          case "remove":
            this.action = {type: 'remove', message: _message };
            break;
          case "connection": 
            this.clients = _message;
            break;
          case "export": 
            const {filename, data} = _message; 
            const elem = this.$refs.download_btn;
            elem.download = filename
            elem.href =  `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
            elem.click();
            break;
        }
      },
      onRowDisabled(event) {
        this.sendMessage = {type: 'disabled', message: event}; 
      },
      onRowSelected(event) {
        this.rowSelected = event;
      },
      onRemove(event) {
        this.sendMessage = {type: 'remove', message: event};
      },
      onExport() {
        this.sendMessage = {type: 'export'};
      },
      onImport(event) {
        this.sendMessage = {type: 'import', message: event};
      }
    }
  })
</script>
