<script setup>
import AppForm from "@/views/AppForm.vue";
import Map from "@/views/components/Map.vue";
</script>

<template>
	<div class="flex flex-col md:flex-row w-full md:h-screen">
		<div class="w-full md:w-1/2 flex flex-col justify-center items-center py-8 md:py-0">
			<AppForm ></AppForm>
		</div>
		<div class="w-full h-48 md:h-full md:w-1/2">
			<Map></Map>
		</div>
	</div>
</template>

