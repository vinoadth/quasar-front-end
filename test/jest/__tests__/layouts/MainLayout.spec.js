import { createLocalVue, shallowMount } from '@vue/test-utils'
import MainLayout from 'layouts/MainLayout.vue'
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

let wrapper
let vm

describe('Main Layout', () => {
    const router = new VueRouter({ routes })
    localVue.use(Quasar, { components })

    beforeEach(() => {
        wrapper = shallowMount(MainLayout, {
            localVue,
            router,
        })
        vm = wrapper.vm
    })

    describe('Header', () => {
        it('has a created hook', () => {
            expect(typeof vm.leftDrawerOpen).toBe('boolean')
            expect(vm.leftDrawerOpen).toBe(true)
        })

        it('has full width header', () => {
            let viewAttr = wrapper.attributes()
            let headerAttr = viewAttr.view.split(' ')
            expect(headerAttr[0]).toBe('hhh')
        })

        it('has correct title', () => {
            let titleTag = wrapper.findComponent(All.QToolbarTitle)
            expect(titleTag.text()).toBe('Test first practice')
        })

        it('should leftDrawerOpen default to true', async () => {
            let leftDrawer = wrapper.findComponent(All.QDrawer)
            expect(leftDrawer.vm.value).toBe(true)

            await wrapper.setData({ leftDrawerOpen: false })

            expect(leftDrawer.vm.value).toBe(false)
        })
    })

    describe('Main -> Page', () => {
        it('should have PageIndex component as first child route', async () => {
            let matchedComponents = router.getMatchedComponents()
            expect(matchedComponents.length).toBeGreaterThan(1)
            expect(matchedComponents[1]['name']).toBe('PageIndex')
        })

        it('should have Pincodes component', async () => {
            router.push('/pincodes')
            await vm.$nextTick()
            let matchedComponents = router.getMatchedComponents()
            expect(matchedComponents.length).toBeGreaterThan(1)
            expect(matchedComponents[1]['name']).toBe('Pincodes')
        })
    })

    describe('Main -> Drawer', () => {
        it('should have links component', () => {
            let links = wrapper.findComponent(Links)
            expect(links.exists()).toBe(true)
        })
    })
})
