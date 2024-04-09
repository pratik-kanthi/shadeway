import { defineStore } from 'pinia'
import {ref} from "vue";

export const useAppStore = defineStore('appStore', ()=>{
	const mapData = ref({});
	const setMapData = (data)=>{
		mapData.value = data;
	}

	return {
		mapData,
		setMapData
	}
});