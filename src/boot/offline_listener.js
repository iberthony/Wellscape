export default async ({ router, store, Vue,redirect}) => {
  async function onNetworkChange(event){
    // store.commit('user/setOnline',event.type === 'online' ? true : false)
    console.log(navigator.onLine)
    store.commit('user/setOnline',navigator.onLine)
  }

  if(Vue.prototype.$q.platform.is.cordova){
    document.addEventListener("offline", onNetworkChange, false)
    document.addEventListener("online", onNetworkChange, false)
  }else{
    window.addEventListener('offline', onNetworkChange, false)
    window.addEventListener('online', onNetworkChange, false)
  }
}