<script setup>
import maplibregl from 'maplibre-gl';
import { onMounted, ref, watch } from "vue";
import { useAppStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import polyline from "@mapbox/polyline";
const appStore = useAppStore();
const { mapData } = storeToRefs(appStore);
let map = null;

onMounted(() => {
	map = new maplibregl.Map({
		container: 'map',
		style: 'https://api.maptiler.com/maps/dataviz-dark/style.json?key=ENEeAqwtRkQpOs7pN5fm',
		center: [0.1276, 51.5072], // starting position [lng, lat]
		zoom: 9 // starting zoom
	});
});

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

				let color;
				switch (segment.code) {
					case 1:
						color = '#00ff00';
						break;
					case 2:
						color = '#3b82f6';
						break;
					case 3:
						color = '#ff0000';
						break;
					default:
						color = '#e7ff00';
						break;
				}

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
						'line-width': 6,
						'line-blur': 2
					}
				});
			});

			// Fit the map to the bounds of all polyline segments
			map.fitBounds(bounds, {
				padding: 100,
				duration: 0
			});
		},
		{ deep: true }
);
</script>

<template>
	<div id="map" class="h-screen"></div>
</template>

<style lang="scss" scoped></style>
