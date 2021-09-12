<template>
    <q-layout view="hhh Lpr lFf">
        <q-header bordered class="text-dark bg-light-blue-3">
            <q-toolbar>
                <q-btn
                    flat
                    @click="leftDrawerOpen = !leftDrawerOpen"
                    round
                    dense
                    icon="menu"
                />
                <q-toolbar-title>
                    Test first practice
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">
            <Links />
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import Links from 'src/components/Links.vue'

export default {
    name: 'MainLayout',
    components: {
        Links,
    },
    data() {
        return {
            leftDrawerOpen: true,
        }
    },
}
</script>
