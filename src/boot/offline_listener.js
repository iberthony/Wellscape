import axios from 'axios'
export default async ({ router, store, Vue,redirect}) => {
  async function onNetworkChange(event){
    let status = event.type === 'online' ? true : false
    store.commit('user/setOnline',status)
  }
  async function setStatus(status){
    store.commit('user/setOnline',status)
  }
    setInterval(() => {
      axios.get('https://random-data-api.com/api/cannabis/random_cannabis?size=1').then(() => {
        setStatus(true)
      }).catch((error) => {
        setStatus(false)
      })
    }, 4000)
    window.addEventListener('offline', onNetworkChange, false)
    window.addEventListener('online', onNetworkChange, false)
  
}