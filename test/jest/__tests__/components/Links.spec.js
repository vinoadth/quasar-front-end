import { createLocalVue, shallowMount } from '@vue/test-utils'
import Links from 'components/Links.vue'
import VueRouter from 'vue-router'
import routes from 'router/routes'

import * as All from 'quasar'

const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
    const val = All[key]
    if (val && val.component && val.component.name != null) {
        object[key] = val
    }
    return object
}, {})

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('Links component', () => {
    const router = new VueRouter({ routes })
    localVue.use(Quasar, { components })

    const wrapper = shallowMount(Links, {
        localVue,
        router,
    })
    const vm = wrapper.vm

    it('should have q-list', () => {
        let qList = wrapper.findComponent(All.QList)
        expect(qList.exists()).toBe(true)
    })

    it('should have route list', () => {
        expect(vm.items).toBeDefined()
    })

    it('should have route items greater than 1', () => {
        expect(vm.items).toBeDefined()
        expect(vm.items.length).toBeGreaterThan(1)
    })

    it('should have item name equals route name', () => {
        expect(vm.items[0]['path']).toBe('/')
    })

    it('should have item name in template', () => {
        expect(wrapper.html()).toEqual(
            expect.stringContaining(vm.items[0]['name'].toUpperCase())
        )
    })
})
