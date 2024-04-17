<script setup>
import maplibregl from 'maplibre-gl';
import {onMounted, ref, watch} from "vue";
import {useAppStore} from "@/store/index.js";
import {storeToRefs} from "pinia";
import polyline from "@mapbox/polyline";
import destinationIcon from "@/assets/destination.svg";
import originIcon from "@/assets/origin.svg";

console.log(destinationIcon);

const appStore = useAppStore();
const {mapData, exposureColors, originPoint, destinationPoint} = storeToRefs(appStore);
let map = null;

onMounted(() => {
	map = new maplibregl.Map({
		container: 'map',
		style: 'https://api.maptiler.com/maps/dataviz-dark/style.json?key=ENEeAqwtRkQpOs7pN5fm',
		center: [0.1276, 51.5072], // starting position [lng, lat]
		zoom: 9 // starting zoom
	});
});

const originMarker = ref(null);
const destinationMarker = ref(null);

watch(
		() => originPoint.value,
		(newValue) => {

			if (originMarker.value) {
				originMarker.value.remove();
			}
			if (!newValue) {
				return;
			}


			const el = document.createElement('div');
			el.className = 'map-marker';
			el.style.backgroundImage = `url('${originIcon}')`;
			el.style.backgroundSize = 'contain';
			el.style.backgroundRepeat = 'no-repeat';
			el.style.width = '48px';
			el.style.height = '48px';


			originMarker.value = new maplibregl.Marker({
				offset: [0, -24],
				element: el,
			})
					.setLngLat([newValue.longitude, newValue.latitude])
					.addTo(map);

		}
);

watch(
		() => destinationPoint.value,
		(newValue) => {
			if (destinationMarker.value) {
				destinationMarker.value.remove();
			}
			if (!newValue) {
				return;
			}

			const el = document.createElement('div');
			el.className = 'map-marker';
			el.style.backgroundImage = `url('${destinationIcon}')`;
			el.style.backgroundSize = 'contain';
			el.style.backgroundRepeat = 'no-repeat';
			el.style.width = '48px';
			el.style.height = '48px';


			destinationMarker.value = new maplibregl.Marker({
				offset: [0, -24],
				element: el,
			})
					.setLngLat([newValue.longitude, newValue.latitude])
					.addTo(map);
		}
);


watch(
		() => mapData.value?.segments,
		(newValue) => {
			if (!newValue) {
				return;
			}

			// Clear existing polyline layers and sources
			newValue.forEach((_, index) => {
				const layerId = `polyline-${index}`;
				if (map.getLayer(layerId)) {
					map.removeLayer(layerId);
				}
				if (map.getSource(layerId)) {
					map.removeSource(layerId);
				}
			});

			// Initialize bounds to fit all segments
			const bounds = new maplibregl.LngLatBounds();

			newValue.forEach((segment, index) => {
				const coordinates = polyline.decode(segment.encodedPolyline).map((point) => [point[1], point[0]]);

				coordinates.forEach((point) => {
					bounds.extend(point);
				});

				// Add each segment as a separate source and layer
				const layerId = `polyline-${index}`;
				map.addSource(layerId, {
					type: 'geojson',
					data: {
						type: 'Feature',
						properties: {},
						geometry: {
							type: 'LineString',
							coordinates: coordinates
						}
					}
				});

				let color = exposureColors.value[segment.code];

				map.addLayer({
					id: layerId,
					type: 'line',
					source: layerId,
					layout: {
						'line-join': 'round',
						'line-cap': 'round'
					},
					paint: {
						'line-color': color,
						'line-width': 4,
					}
				});
			});

			// Fit the map to the bounds of all polyline segments
			map.fitBounds(bounds, {
				padding: 100,
				duration: 0
			});
		},
		{deep: true}
);
</script>

<template>
	<div id="map" class="h-full md:h-screen"></div>
</template>

<style lang="scss" scoped></style>
