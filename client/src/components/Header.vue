<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <action-group @filter="onActionChange"></action-group>
            </v-col>
            <v-col cols="6">
                <!-- <filter-group :filterData="filterData" @filter="onFilterChange"></filter-group> -->
                <v-autocomplete
                    solo
                    dense
                    prepend-inner-icon="mdi-magnify"
                    clearable
                    hide-details="true"
                    disable-lookup
                    hide-no-data
                    hide-selected
                    append-icon=""
                ></v-autocomplete>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {

}
</script>