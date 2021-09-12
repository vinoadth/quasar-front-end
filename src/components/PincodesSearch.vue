<template>
    <div>
        <q-icon
            v-if="cityName !== ''"
            name="close"
            @click="cityName = ''"
            class="cursor-pointer"
        />
        <q-icon
            class="cursor-pointer"
            name="search"
            @click="fetchPincodeList"
        />
    </div>
</template>
<script>
export default {
    name: 'PincodesSearch',
    props: {
        fetchPincodeList: Function,
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
    },
}
</script>
