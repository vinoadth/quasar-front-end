import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

import pincodes from './pincodes'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export const modules = {
    pincodes,
}

export default function() {
    const Store = new Vuex.Store({
        modules,
        strict: process.env.DEBUGGING,
    })

    return Store
}
