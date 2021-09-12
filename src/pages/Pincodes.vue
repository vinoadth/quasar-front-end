<template>
    <q-page padding>
        <q-input
            outlined
            bottom-slots
            v-model="cityName"
            label="Location in India"
            @keyup.enter="fetchPincodeList"
            counter
            dense
        >
            <template v-slot:before>
                <q-icon name="place" />
            </template>
            <PincodesSearch
                slot="append"
                :fetchPincodeList="fetchPincodeList"
            />
            <template v-slot:hint>
                Enter the place name.
            </template>
        </q-input>
        <div class="q-pa-md">
            <q-table
                :title="cityName + ' Pincodes'"
                :data="pincodeList"
                :columns="columns"
                :filter="filter"
                no-data-label="No result found"
                no-results-label="The filter didn't uncover any results"
                row-key="name"
                class="pincode-table"
                flat
                bordered
            >
                <template v-slot:top-right>
                    <q-input
                        borderless
                        dense
                        debounce="300"
                        v-model="filter"
                        placeholder="Search"
                    >
                        <q-icon slot="append" name="search" />
                    </q-input>
                </template>

                <template v-slot:no-data="{ icon, message, filter }">
                    <div class="full-width row flex-center q-gutter-sm">
                        <q-icon size="2em" name="sentiment_dissatisfied" />
                        <span> {{ message }} </span>
                        <q-icon
                            size="2em"
                            :name="filter ? 'filter_b_and_w' : icon"
                        />
                    </div>
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PincodesSearch from 'components/PincodesSearch'

export default {
    name: 'Pincodes',
    components: {
        PincodesSearch,
    },
    data() {
        return {
            filter: '',
            columns: [
                {
                    name: 'Name',
                    label: 'Name',
                    align: 'left',
                    field: row => row.Name,
                },
                {
                    name: 'Pincode',
                    label: 'Pincode',
                    sortable: true,
                    align: 'right',
                    field: row => row.Pincode,
                },
                {
                    name: 'BranchType',
                    label: 'BranchType',
                    align: 'left',
                    field: row => row.BranchType,
                },
                {
                    name: 'District',
                    label: 'District',
                    align: 'left',
                    field: row => row.District,
                },
                {
                    name: 'Circle',
                    label: 'Circle',
                    align: 'left',
                    field: row => row.Circle,
                },
                {
                    name: 'State',
                    label: 'State',
                    align: 'left',
                    field: row => row.State,
                },
                {
                    name: 'Country',
                    label: 'Country',
                    align: 'left',
                    field: row => row.Country,
                },
            ],
        }
    },
    computed: {
        cityName: {
            get() {
                return this.$store.state.pincodes.cityName
            },
            set(value) {
                this.$store.commit('pincodes/updateCityName', value)
            },
        },
        ...mapState({
            pincodeList: state => state.pincodes.pincodeList,
        }),
    },
    methods: {
        ...mapActions({
            fetchPincodeList: 'pincodes/fetchPincodeList',
        }),
    },
}
</script>
<style lang="sass">
.pincode-table
  /* height or max-height is important */
  height: 500px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: $light-blue-3

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
