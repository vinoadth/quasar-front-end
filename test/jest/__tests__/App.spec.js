import { mount, createLocalVue } from '@vue/test-utils'
import * as All from 'quasar'

import VueRouter from 'vue-router'

import App from 'App.vue'
import routes from 'router/routes'

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

describe('Mount Quasar', () => {
    const router = new VueRouter({ routes })

    localVue.use(Quasar, { components })

    const wrapper = mount(App, {
        localVue,
        router,
    })
    const vm = wrapper.vm

    it('should route 400 to invalid url', async () => {
        router.push('/someinvalidurl')
        await vm.$nextTick()
        let pageText = wrapper.text()
        let expectedText = 'Oops. Nothing here'
        expect(pageText).toEqual(expect.stringContaining(expectedText))
    })
})
