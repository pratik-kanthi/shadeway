<script setup lang="ts">
import AppForm from "@/views/AppForm.vue";
import Map from "@/views/components/Map.vue";
import HowItWorks from "@/views/components/HowItWorks.vue";
import {ref} from "vue";
import { QuestionMarkCircledIcon } from '@radix-icons/vue';

const open = ref(false);
</script>

<template>
	<div class="flex flex-col md:flex-row w-full md:h-screen">
		<div class="w-full md:w-1/2 flex flex-col justify-between items-center py-8 md:py-8">
			<div></div>
			<AppForm></AppForm>
			<div class="hidden md:flex items-center justify-center gap-x-4 md:py-0">
				<div class="text-sm font-medium underline cursor-pointer flex items-center gap-x-2" @click="open = true">How does it work? <QuestionMarkCircledIcon></QuestionMarkCircledIcon></div>
				<div class="text-sm font-medium">made by <a class="underline" href="https://twitter.com/pratikanthi" target="_blank">@pratikanthi</a></div>
			</div>
		</div>

		<div class="px-6 md:px-0 mt-8 md:mt-0 h-64 md:h-full md:w-1/2">
			<Map></Map>
		</div>

	</div>

	<div class="flex flex-col items-center justify-center md:hidden py-8 gap-y-4 md:py-0 gap-x-6">
		<div class="text-sm font-medium underline cursor-pointer flex items-center gap-x-2" @click="open = true">How does it work? <QuestionMarkCircledIcon></QuestionMarkCircledIcon></div>
		<div class="text-sm font-medium">made by <a class="underline" href="https://twitter.com/pratikanthi" target="_blank">@pratikanthi</a></div>
	</div>



	<HowItWorks v-model:open="open" model-value></HowItWorks>


</template>

