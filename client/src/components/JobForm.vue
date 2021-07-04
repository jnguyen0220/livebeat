<template>
  <v-row justify="center">
    <v-dialog
      v-model="isOpen"
      persistent
      max-width="600px"
    >
      <v-card>
          <v-app-bar flat tile outlined>
            <v-toolbar-title>
              Task Detail
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon
              @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-app-bar>
        <v-form v-model="valid" lazy-validation ref="form">
       <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                    label="Source*"
                    v-model="source"
                    @change="onSourceChange"
                    :rules="requiredRules('Source')"
                    required
                    ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                <v-text-field
                  label="Port*"
                  type="number"
                  v-model="port"
                  :rules="requiredRules('Port')"
                  required
                ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field
                    label="Schedule*"
                    v-model="schedule"
                    :rules="requiredRules('Schedule')"
                    required
                    ></v-text-field>
                </v-col>

                 <v-col
                cols="12"
                sm="6">
                <v-select
                  :items="['PING', 'REST', 'GQL']"
                  v-model="taskType"
                  label="Task Type*"
                  :rules="requiredRules('Task Type')"
                  required
                ></v-select>
                </v-col>
            </v-row>
             <v-row>
              <v-col>
                <small>*indicates required field</small>
              </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" v-show="!isBodyHeaderHidden"> 
                <v-tabs grow v-model="tab">
                  <v-tab key="header">Header</v-tab>
                  <v-tab key="body">Body</v-tab>  
                </v-tabs>
                <v-tabs-items v-model="tab">
                  <v-tab-item key="header">
                      <v-textarea no-resize v-model="header" filled clearable
                      ></v-textarea>
                  </v-tab-item>
                  <v-tab-item key="body"> 
                      <v-textarea no-resize v-model="body" filled clearable
                      ></v-textarea>              
                  </v-tab-item>
                </v-tabs-items>
                </v-col>
            </v-row>
       </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
          small tile
          type="submit"
          :disabled="!isSaveButtonEnabled"
          @click="onSave"
          >
          <v-icon color="primary">mdi-content-save</v-icon>
            Save
          </v-btn>
           <v-btn
          small
          tile
            @click="onClose"
          >
          <v-icon color="secondary">mdi-close</v-icon>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['dialog','item'],
    data: () => ({
      source: null,
      valid: false,
      taskType: null,
      requiredRules: (name) => [
        v => !!v || `${name} is required`
      ],
      id: null,
      tab: 'header',
      port: null,
      schedule: null,
      isOpen: false,
      isSaveButtonEnabled: false,
      isBodyHeaderHidden: true,
      taskTypeList: ['REST','GQL'],
      header: null,
      body: null,
      protocolList: new Map([
        ['http', 80],
        ['https', 443]
      ])
    }),
    methods: {
      onClose() {
        this.isOpen = false
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
      },
      onSave() {
        this.$emit('action', {
          action: this.id ? 'UPDATE' : 'ADD',
          ...(this.id && {id: this.id}),
          source: this.source,
          port: this.port,
          schedule: this.schedule,
          taskType: this.taskType,
          ...(this.taskType !== 'PING' && {method: this.body ? 'POST' : 'GET'}),
          ...(this.header && {header: this.header}),
          ...(this.body && {id: this.body}),
        })
        this.$refs.form.reset();
        this.isOpen = false;
      },
      onSourceChange(value) {
        const found = Array.from(this.protocolList.keys()).find(x => value.indexOf(`${x}://`) >= 0);
        this.port = found ? this.protocolList.get(found) : null;
      },
      setSaveButtonEnabled() {
        this.isSaveButtonEnabled = [this.source, this.taskType, this.port, this.schedule].every(x => x);
      }
    },
    watch: {
      dialog(curr, prev) {
        this.isOpen = true;
      },
      taskType(curr, prev) {
        this.tab = 'header';
        this.isBodyHeaderHidden = !this.taskTypeList.some(x => x === curr)
        this.setSaveButtonEnabled()
      },
      port(curr, prev){
        this.setSaveButtonEnabled()
      },
      schedule(curr, prev) {
        this.setSaveButtonEnabled()
      },
      source(curr, prev) {
        this.setSaveButtonEnabled()
      }
    }
  }
</script>