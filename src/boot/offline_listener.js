export default async ({ router, store, Vue,redirect}) => {
  async function onNetworkChange(){
    // store.state.user.is_online = navigator.onLine
    store.commit('user/setOnline',navigator.onLine)
  }

  if(Vue.prototype.$q.platform.is.cordova){
    console.log(navigator)
    document.addEventListener("offline", onNetworkChange, false)
    document.addEventListener("online", onNetworkChange, false)
  }else{
    onNetworkChange()
    window.addEventListener('offline', onNetworkChange, false)
    window.addEventListener('online', onNetworkChange, false)
  }
}