<template>
    <div>
        <q-list v-for="item in items" :key="item.name">
            <q-item
                clickable
                :active="item.name == currentRouteName"
                active-class="text-dark bg-light-blue-3"
                :to="item"
                exact
            >
                <q-item-section>
                    {{ item.name.toUpperCase() }}
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script>
export default {
    name: 'Links',
    data() {
        return {
            items: [],
        }
    },
    created() {
        this.$router.options.routes.forEach(parentRoute => {
            if (parentRoute.children)
                parentRoute.children.forEach(route => {
                    this.items.push({
                        name: route.name,
                        path: parentRoute.path + route.path,
                    })
                })
        })
    },
    computed: {
        currentRouteName() {
            return this.$route.name
        },
    },
}
</script>

<style></style>
