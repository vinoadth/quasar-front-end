import { createLocalVue, shallowMount } from '@vue/test-utils'
import PincodesSearch from 'components/PincodesSearch'
import Vuex from 'vuex'
import * as All from 'quasar'

import pincodesState from 'store/pincodes/state'
import { updateCityName } from 'store/pincodes/mutations'

const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
    const val = All[key]
    if (val && val.component && val.component.name != null) {
        object[key] = val
    }
    return object
}, {})

describe('PincodesSearch - Component', () => {
    const localVue = createLocalVue()
    localVue.use(Quasar, { components }) // , lang: langEn
    localVue.use(Vuex)

    let modules = {
        pincodes: {
            namespaced: true,
            state: pincodesState(),
            mutations: {
                updateCityName,
            },
        },
    }

    let store = new Vuex.Store({
        modules,
    })

    const wrapper = shallowMount(PincodesSearch, {
        localVue,
        propsData: {
            fetchPincodeList: jest.fn(),
        },
        store,
    })

    it('should have q-icon for search', () => {
        let qIcon = wrapper.findComponent(All.QIcon)
        expect(qIcon.exists()).toBeTruthy()
        expect(qIcon.attributes('name')).toBe('search')
    })

    it('should have q-icon for close', async () => {
        wrapper.vm.$store.commit('pincodes/updateCityName', 'Chennai')
        await wrapper.vm.$nextTick()
        let qIcon = wrapper.findComponent(All.QIcon)
        expect(qIcon.exists()).toBeTruthy()
        expect(qIcon.attributes('name')).toBe('close')
    })

    it('should close q-icon reset cityName', async () => {
        wrapper.vm.$store.commit('pincodes/updateCityName', 'Chennai')
        await wrapper.vm.$nextTick()
        let qIcon = wrapper.findComponent(All.QIcon)
        expect(wrapper.vm.cityName).toBe('Chennai')
        qIcon.vm.$emit('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.cityName).toBe('')
    })

    it('should search q-icon click call fetchPincodeList', async () => {
        let qIcon = wrapper.findComponent(All.QIcon)
        expect(qIcon.attributes('name')).toBe('search')
        qIcon.vm.$emit('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.fetchPincodeList).toHaveBeenCalled()
    })
})
