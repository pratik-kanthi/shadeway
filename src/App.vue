<script setup>
import AppForm from "@/views/AppForm.vue";
import Map from "@/views/components/Map.vue";
</script>

<template>
	<div class="flex flex-col md:flex-row w-full md:h-screen">
		<div class="w-full md:w-1/2 flex flex-col justify-between items-center py-8 md:py-8">
			<AppForm ></AppForm>
			<div class="hidden md:block">
				<div class="text-sm font-medium">Made by <a class="underline" href="https://twitter.com/pratikanthi" target="_blank">@pratikanthi</a></div>
			</div>

		</div>
		<div class="px-6 md:px-0 mt-8 md:mt-0 h-64 md:h-full md:w-1/2">
			<Map></Map>
		</div>

		<div class="md:hidden flex items-center justify-center pt-4 py-2 md:py-0">
			<div class="text-sm font-medium">Made by <a class="underline" href="https://twitter.com/pratikanthi" target="_blank">@pratikanthi</a></div>
		</div>
	</div>
</template>

