import { defineStore } from 'pinia'
import {ref} from "vue";

export const useAppStore = defineStore('appStore', ()=>{
	const mapData = ref({});
	const setMapData = (data)=>{
		mapData.value = data;
	};

	const setPoints = (origin, destination)=>{
		originPoint.value = origin;
		destinationPoint.value = destination;
	};

	const originPoint = ref(null);
	const destinationPoint = ref(null);

	const exposureColors = ref({
		1: '#2f7a04', //right side
		2: '#ffe066', //left side
		3: '#3b82f6', //no sun
	});

	return {
		mapData,
		setMapData,
		setPoints,
		exposureColors,
		originPoint,
		destinationPoint
	}
});