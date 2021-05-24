import Vue from "vue"

import vHeader from "./vHeader.vue"
import vNav from "./vNav.vue"
let components={
    vHeader,
    vNav
}

for(let key in components){
    Vue.component(key,components[key])
}