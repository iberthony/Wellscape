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

export const setWells = (state, data) => {
  state.wells = data
  LocalStorage.set('wells', state.wells)
}

export const setPressureReadings = (state, data) => {
  state.pressure_readings = data
  LocalStorage.set('pressure_readings', state.pressure_readings)
}

export const setActivities = (state, data) => {
  state.activities = data
  LocalStorage.set('activities', state.activities)
}

export const setOnline = (state, data) => {
  state.is_online = data
}