<script setup>
import AppForm from "@/views/AppForm.vue";
import Map from "@/views/components/Map.vue";
</script>

<template>
	<div class="flex flex-col-reverse md:flex-row w-full h-screen">
		<div class="w-full md:w-1/2 flex flex-col justify-center items-center">
			<AppForm ></AppForm>
		</div>
		<div class="w-full md:w-1/2">
			<Map></Map>
		</div>
	</div>
</template>

