<template>
    <ag-grid-vue
      class="ag-theme-material grid"
      :columnDefs="columnDefs"
      rowSelection="multiple"
      animateRows="true"
      suppressRowClickSelection="true"
      suppressCellSelection="true"
      suppressHorizontalScroll="true"
      :isExternalFilterPresent="isExternalFilterPresent"
      cellRenderer="agAnimateShowChangeCellRenderer"
      :doesExternalFilterPass="doesExternalFilterPass"
      :getRowNodeId="getRowNodeId"
      :rowData="rowData"
      :context="context"
      @rowDataUpdated="onRowDataUpdated"
      @rowDataChanged="onRowDataUpdated"
      @onFilterChanged="onRowDataUpdated"
      @selection-changed="onSelectionChanged"
      @grid-ready="onGridReady">
    </ag-grid-vue>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import AvailableIndicator from '@/components/AvailableIndicator';
import RowActionButtonGroup from '@/components/RowActionButtonGroup';
import dayjs from "@/dayjs";

export default {
  name: "Grid",
  props: ['action','filterStatus','globalFilter'],
  components: {
    AgGridVue,
    AvailableIndicator,
    RowActionButtonGroup
  },
  data: () => ({
    rowData: [],
    context: null,
    externalFilter: null,
    columnDefs: [
      { headerName: "", sortable: false, checkboxSelection: true, width: '10%' },
      { headerName: "Action", sortable: false, cellRendererFramework: 'RowActionButtonGroup' },
      { headerName: "Status", field: "available", sortable: true, cellRendererFramework: 'AvailableIndicator' },
      { headerName: "Source", field: "uri", sortable: true },
      { headerName: "Protocol", field: "protocol", sortable: true },
      { headerName: "Last Status Change", field: "status_change", sortable: true },
      { headerName: "Uptime", field: "uptime", sortable: true },
      { headerName: "Last Ping", field: "last_ping_time", sortable: true, cellRenderer: 'agAnimateShowChangeCellRenderer' },
      { headerName: "Port", field: "port", sortable: true },
      { headerName: "Schedule", field: "schedule", sortable: true },
    ]
  }),
  beforeMount() {
    this.context = {componentParent: this};
  },
  methods: {
    isExternalFilterPresent() {
      return true;
    },
    onRowDataUpdated() {
      const result = new Map();
      if (this.gridApi) {
        this.gridApi.forEachNode((node,index) => {
          const key = node.data.available;
          if (!result.has(key)) {
            result.set(key, 0);
          }
          const value = result.get(key);
          result.set(key, value + 1);
        })
        this.$emit('filter-data', result)
      }
    },
    doesExternalFilterPass(node) {
      return this.externalFilter ? node.data.available === this.externalFilter : true;
    },
    getRowNodeId(data) {
      return data.id
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
      this.gridApi.sizeColumnsToFit();
    },
    onToggle(event) {
      this.$emit("disabled-row", event);
    },
    updateGrid(id, params) {
      const rowNode = this.gridApi.getRowNode(id);
      const update = {
        ...rowNode.data,
        ...params
      };
      this.gridApi.applyTransactionAsync({ update: [update] });
    },
    onSelectionChanged(event) {
      const ids = event.api.getSelectedNodes().filter(x => x.isSelected()).map(x => x.data.id);
      this.$emit("row-selected", ids);
    },
    onGridRemove(ids) {
      const rowNodes = ids.map(x => this.gridApi.getRowNode(x));
      this.gridApi.applyTransactionAsync({ remove: rowNodes });
    }
  },
  watch: { 
    globalFilter(curr, _) {
      this.gridApi.setQuickFilter(curr);
    },
    action({type, message}, _) { 
      const {id, enabled, available, uptime, protocol, status_change} = message;
      switch(type) {
        case "load":
          this.rowData = message;
          this.gridApi.sizeColumnsToFit();
          break;
        case "add":
          this.gridApi.applyTransactionAsync({ add: message });
          break;
        case "update":
          const { last_ping_time } = message;
          this.updateGrid(id, {
            enabled,
            available,
            uptime,
            status_change: dayjs(status_change).fromNow(),
            protocol,
            last_ping_time: new Date(last_ping_time).toLocaleTimeString()
          });
          break;
        case "disabled":
          this.updateGrid(id, {
            enabled,
            available,
            protocol: null,
            uptime: null,
            status_change: null,
            last_ping_time: null
          });
          break;
        case "remove":
          this.onGridRemove(message);
          break;
      }
    },
    filterStatus(event) {
      this.externalFilter = event
      this.gridApi.onFilterChanged();
    }
  }
}
</script>