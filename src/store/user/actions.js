/*
export function someAction (context) {
}
*/
let url = "https://main.well-scape.com/wp-json/yc-app/v1/"
import axios from 'axios'

export const loginUser = async(context, payload) => {
  return new Promise(function(resolve, reject){
    axios.post(url+'loginuser',payload)
    .then((response) => {
      if(response.data){
        if(response.success){
          context.commit('setUser',{...response.data.data,avatar:response.data.avatar})
        }
        resolve(response)
      }
    }).catch(error =>{
      reject(error)
    });
  });
}

export const verifyCompany = async(context, payload) => {
  return new Promise(function(resolve, reject){
    axios.post(url+'verifycompany',payload)
    .then((response) => {
      console.log(response.data)
      if(response.data.success){
        context.commit('setWebUrl',response.data.webAppUrl)
      }
      resolve(response)
    }).catch(error =>{
      reject(error)
    });
  });
}

export const loadWells = async(context, payload) => {
  return new Promise(function(resolve, reject){
    if(!context.state.webAppUrl) return
    axios.post(context.state.webAppUrl+'wells',payload)
    .then((response) => {
      console.log(response.data)
      resolve(response)
    }).catch(error =>{
      reject(error)
    });
  });
}

export const dashboardLoad = async(context, payload) => {
  return new Promise(function(resolve, reject){
    if(!context.state.webAppUrl) return
    axios.post(context.state.webAppUrl+'dashboard',payload)
    .then((response) => {
      if(response.data.pressure_readings) context.commit('setPressureReadings',response.data.pressure_readings)
      if(response.data.activities) context.commit('setActivities',response.data.activities)
      resolve(response)
    }).catch(error =>{
      reject(error)
    });
  });
}