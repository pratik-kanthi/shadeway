<script setup>
import AddressSearch from "@/views/components/AddressSearch.vue";
import Input from '@/components/ui/input/Input.vue';
import Button from "@/components/ui/button/Button.vue";
import Combobox from "@/views/components/Combobox.vue";
import {computed, ref} from "vue";
import axios from "axios";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import {SunIcon, ResetIcon} from '@radix-icons/vue'
import {useAppStore} from "@/store/index.js";


const appStore = useAppStore();
const { mapData , setMapData } = appStore;

const timezoneOptions = ref([
	{ label: "Europe/London (GMT)", value: "Europe/London" },
	{ label: "Asia/Kolkata (GMT+5:30)", value: "Asia/Kolkata" }
]);

const origin = ref();
const destination = ref();
const time = ref();
const exposureData = ref();
const journeyData = ref();
const timezone = ref();

const handleOriginSelect = (val)=>{
	origin.value = val;
}

const handleDestinationSelect = (val)=>{
	destination.value = val;
}

const handleTimezoneSelect = (val)=>{
	timezone.value = val;
}

const loading = ref(false);
const calculateExposure = async (val)=>{
	loading.value = true;
	const result = await axios.get('https://exposure-calculator.shadeway.workers.dev/get-exposure',{
		params:{
			from : `${origin.value.latitude},${origin.value.longitude}`,
			to : `${destination.value.latitude},${destination.value.longitude}`,
			time: time.value.replace("T"," "),
			timezone: timezone.value.value.value
		}
	});
	loading.value = false;
	exposureData.value = result.data.exposureData;
	journeyData.value = result.data;
	setMapData(result.data);
}


const resetForm = ()=>{
	origin.value = null;
	destination.value = null;
	time.value = null;
	timezone.value = null;
	exposureData.value = null;
	journeyData.value = null;
	setMapData(null);
}

const isBusy = computed(()=>{
	return loading.value || origin.value === null || destination.value === null || time.value === null || timezone.value === null;
})
</script>


<template>
	<div class="flex gap-y-4 flex-col md:w-3/4 px-6 md:px-0">

		<div>
			<div class="text-4xl font-medium">Shadeway</div>
			<div>Find the most optimal seat on your journey and avoid the sun</div>
		</div>


		<div class="flex flex-col gap-y-1">
			<Label class="font-medium">Origin</Label>
			<AddressSearch @selected="handleOriginSelect"></AddressSearch>
		</div>

		<div class="flex flex-col gap-y-1">
			<Label class="font-medium">Destination</Label>
			<AddressSearch @selected="handleDestinationSelect"></AddressSearch>
		</div>

		<div class="flex flex-col md:flex-row gap-x-4">
			<div class="flex flex-col gap-y-1">
				<Label class="font-medium">Time</Label>
				<Input v-model="time" type="datetime-local" class="h-12 font-medium" placeholder="Email"></Input>
			</div>
			<div class="flex flex-col gap-y-1 w-full">
				<Label class="font-medium">Timezone</Label>
				<Combobox :options="timezoneOptions" @selected="handleTimezoneSelect"></Combobox>
			</div>
		</div>

		<div class="flex gap-x-2 mt-4 w-full justify-between">
			<Button @click="calculateExposure" :disabled="loading" class="flex gap-x-2">
				<SunIcon/>
				<div>Calculate</div>
			</Button>
			<Button @click="resetForm" :disabled="loading" class="flex gap-x-2">
				<ResetIcon/>
				<div>Reset</div>
			</Button>
		</div>

		<div class="flex flex-col gap-y-2">

			<div class="mt-4 py-4 bg-zinc-100 rounded-md px-6" v-if="journeyData">
				<div class="flex gap-x-8">
					<div>
						<div class="font-semibold">Duration</div>
						<div class="text-2xl font-semibold">{{ journeyData.duration.text }}</div>
					</div>

					<div>
						<div class="font-semibold">Distance</div>
						<div class="text-2xl font-semibold">{{ journeyData.distance.text }}</div>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-2 mt-4" v-if="exposureData">
				<Card v-if="exposureData['Left Side']">
					<CardHeader>
						<CardTitle>Left Side</CardTitle>
						<CardDescription>Sun exposure on left side</CardDescription>
					</CardHeader>
					<CardContent class="text-2xl font-semibold" :class="exposureData['Left Side'] > exposureData['Right Side'] ? 'text-red-600' : 'text-green-600' ">
						{{ exposureData['Left Side'].toFixed(2) }} %
					</CardContent>
				</Card>
				<Card v-if="exposureData['Right Side']">
					<CardHeader>
						<CardTitle>Right Side</CardTitle>
						<CardDescription>Sun exposure on right side</CardDescription>
					</CardHeader>
					<CardContent class="text-2xl font-semibold" :class="exposureData['Left Side'] < exposureData['Right Side'] ? 'text-red-600' : 'text-green-600' ">
						{{ exposureData['Right Side'].toFixed(2)}} %
					</CardContent>
				</Card>
				<Card v-if="exposureData['No Sun']">
					<CardHeader>
						<CardTitle>No Sun</CardTitle>
						<CardDescription>No sun exposure</CardDescription>
					</CardHeader>
					<CardContent class="text-2xl font-semibold" :class="exposureData['Left Side'] < exposureData['Right Side'] ? 'text-red-600' : 'text-green-600' ">
						{{ exposureData['No Sun'].toFixed(2)}} %
					</CardContent>
				</Card>
			</div>




		</div>



	</div>
</template>