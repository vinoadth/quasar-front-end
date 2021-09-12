/*
export function someAction (context) {
}
*/

import axios from 'axios'

export const fetchPincodeList = async ({ commit, state }) => {
    let response = await axios.get(
        `https://api.postalpincode.in/postoffice/${state.cityName}`
    )
    if (response.data[0]['PostOffice']) {
        commit('updatePincodeList', response.data[0]['PostOffice'])
    }
}
