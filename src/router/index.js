import Vue from 'vue'
import Router from 'vue-router'
// 实现按需加载，require.ensure(dependencies: String[], callback: function(require), chunkName: String)
const Home = r => require.ensure([],()=>r(require("@/components/home")),'home')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: Home
    },
    {
    	path:"/home",
    	name: "home",
    	component : Home
    },
 
  ]
})
