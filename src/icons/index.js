import Vue from 'vue'

import IconSvg from '@/components/svgIcon/icon-svg'

//全局注册icon-svg
Vue.component('icon-svg', IconSvg)


const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)/*  */