import { createLocalVue } from '@vue/test-utils'
import {
    mountFactory,
    qLayoutInjections,
} from '@quasar/quasar-app-extension-testing-unit-jest'
import Pincodes from 'pages/Pincodes.vue'
import PincodesSearch from 'components/PincodesSearch'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import routes from 'router/routes'

import {
    QPage,
    QInput,
    QBtn,
    QList,
    QItem,
    QTable,
    QTr,
    QTh,
    QTd,
    QIcon,
} from 'quasar'

import pincodesState from 'store/pincodes/state'
import { updateCityName, updatePincodeList } from 'store/pincodes/mutations'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

const fetchPincodeList = jest.fn()

let store
let modules
let wrapper
let vm

let pincodeList = [
    {
        Message: 'Number of Post office(s) found:1',
        Status: 'Success',
        PostOffice: [
            {
                Name: 'Mudichur',
                Description: null,
                BranchType: 'Sub Post Office',
                DeliveryStatus: 'Non-Delivery',
                Circle: 'Tamilnadu',
                District: 'Kanchipuram',
                Division: 'Tambaram',
                Region: 'Chennai Region',
                State: 'Tamil Nadu',
                Country: 'India',
                Pincode: '600048',
            },
        ],
    },
]

describe('Pincodes page', () => {
    beforeEach(() => {
        // const router = new VueRouter({ routes })
        modules = {
            pincodes: {
                namespaced: true,
                state: pincodesState(),
                mutations: {
                    updateCityName,
                    updatePincodeList,
                },
                actions: {
                    fetchPincodeList,
                },
            },
        }
        store = new Vuex.Store({
            modules,
        })
        const factory = mountFactory(Pincodes, {
            slots: {
                before: '<div />',
            },
            mount: {
                localVue,
                store,
                provide: qLayoutInjections(),
            },
            quasar: {
                components: {
                    QPage,
                    QInput,
                    QBtn,
                    QList,
                    QItem,
                    QTable,
                    QTr,
                    QTh,
                    QTd,
                    QIcon,
                },
            },
        })

        wrapper = factory({ pincodeList: pincodeList[0]['PostOffice'] })
        vm = wrapper.vm
    })

    describe('pincodes -> default states', () => {
        it('should have default cityName empty', () => {
            expect(modules.pincodes.state.cityName).toBe('')
        })
        it('should have default pincodeList empty', () => {
            expect(modules.pincodes.state.pincodeList).toEqual([])
        })
        it('should have default message empty', () => {
            expect(modules.pincodes.state.message).toBe('')
        })
    })

    it('should have q-page with class flex', () => {
        let qPage = wrapper.findComponent(QPage)
        expect(qPage.attributes('padding')).toBeTruthy()
    })

    it('should have q-list', () => {
        expect(wrapper.findComponent(QList).exists()).toBe(false)
    })

    it('should have q-input', () => {
        expect(wrapper.findComponent(QInput).exists()).toBe(true)
    })

    it('should have outline attribute on q-input', () => {
        let qInput = wrapper.findComponent(QInput)
        expect(qInput.attributes()).toHaveProperty('outlined')
    })

    it('should have state value', () => {
        let qInput = wrapper.findComponent(QInput)
        expect(qInput.vm.value).toBe('')
    })

    it('should update cityName on q-input change', async () => {
        await wrapper.setData({ cityName: 'Chennai' })
        let qInput = wrapper.findComponent(QInput)
        expect(qInput.vm.value).toBe('Chennai')
    })

    it('should q-input keyup enter call fetchPincodeList', async () => {
        let qInput = wrapper.findComponent(QInput)
        qInput.vm.$emit(
            'keyup',
            new KeyboardEvent('keyup', {
                keyCode: 13,
            })
        )
        await vm.$nextTick()
        expect(fetchPincodeList).toHaveBeenCalled()
    })

    it('should have q-table', () => {
        let qTable = wrapper.findComponent(QTable)
        expect(qTable.exists()).toBeTruthy()
    })

    it('should have pincodes-search component', () => {
        let pincodesSearch = wrapper.findComponent(PincodesSearch)
        expect(pincodesSearch.exists()).toBeTruthy()
    })

    it('should have pincode component with pincodeList data', async () => {
        let pincodeList = [
            {
                "Name": "Mudichur",
                "Description": null,
                "BranchType": "Sub Post Office",
                "DeliveryStatus": "Non-Delivery",
                "Circle": "Tamilnadu",
                "District": "Kanchipuram",
                "Division": "Tambaram",
                "Region": "Chennai Region",
                "State": "Tamil Nadu",
                "Country": "India",
                "Pincode": "600048"
            }
        ]
        wrapper.vm.$store.commit(
            'pincodes/updatePincodeList',
            pincodeList
        )
        await wrapper.vm.$nextTick()
        let qTable = wrapper.findComponent(QTable)
        expect(qTable.vm.data).toEqual(pincodeList)
    })
})
