import Vue from "vue"

import filterPrice from "./filterPrice"

let filters = {
    filterPrice,

}

for(let key in filters){
    Vue.filter(key,filters[key]);
}