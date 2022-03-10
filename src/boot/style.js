export default async ({ Vue }) => {
  Vue.prototype.$style = {
    title: {fontFamily:'Montserrat-Regular'},
    titleSmall: {fontFamily:'Montserrat-Regular', fontSize:9},
    errorMessage: {borderRadius:10, backgroundColor:'#ffd9d9', color:'#ff4040', width:'100%', padding:5, fontSize:12, textAlign:'center', marginVertical:10, fontFamily:'Montserrat-Regular' },
  }
}
