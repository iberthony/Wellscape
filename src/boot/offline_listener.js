import axios from 'axios'
export default async ({ router, store, Vue,redirect}) => {
  async function onNetworkChange(event){
    let status = event.type === 'online' ? true : false

  }
  async function setStatus(status){
    store.commit('user/setOnline',status)
  }
   
    window.addEventListener('offline', onNetworkChange, false)
    window.addEventListener('online', onNetworkChange, false)
  
}