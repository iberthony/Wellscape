/*
export function someMutation (state) {
}
*/
import { LocalStorage } from 'quasar'

export const setUser = (state, data) => {
  state.user = data
  LocalStorage.set('user', state.user)
}

export const setWebUrl = (state, data) => {
  state.webAppUrl = data
  LocalStorage.set('webAppUrl', state.webAppUrl)
}

export const setPressureReadings = (state, data) => {
  state.pressure_readings = data
}

export const setActivities = (state, data) => {
  state.activities = data
}