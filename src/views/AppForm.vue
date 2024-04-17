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
import dayjs from "dayjs";


const appStore = useAppStore();
const { mapData , setMapData, setPoints } = appStore;

const timezoneOptions = ref([
	{ label: "Europe/London", value: "Europe/London" },
	{ label: "Asia/Calcutta", value: "Asia/Calcutta" }
]);

const origin = ref(null);
const destination = ref(null);
const time = ref('');
const exposureData = ref(null);
const journeyData = ref(null);
const timezone = ref(null);

time.value = dayjs().format('YYYY-MM-DD HH:mm');

const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
timezone.value = timezoneOptions.value.find(tz => tz.value === systemTimeZone);


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
			timezone: timezone.value.value.value === 'Asia/Calcutta' ? 'Asia/Kolkata' : timezone.value.value.value
		}
	});
	loading.value = false;
	exposureData.value = result.data.exposureData;
	journeyData.value = result.data;

	setMapData(result.data);
	setPoints(origin.value, destination.value);

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
			<img src="@/assets/logo.svg" class="w-32 md:w-64" alt="logo">
			<div class="text-gray-500 text-base">Find the most optimal seat on your journey and avoid the sun</div>
		</div>

		<div class="flex flex-col gap-y-1">
			<Label class="font-medium">Origin</Label>
			<AddressSearch @selected="handleOriginSelect"></AddressSearch>
		</div>

		<div class="flex flex-col gap-y-1">
			<Label class="font-medium">Destination</Label>
			<AddressSearch @selected="handleDestinationSelect"></AddressSearch>
		</div>

		<div class="flex flex-col md:flex-row gap-x-4 gap-y-4">
			<div class="flex flex-col gap-y-1">
				<Label class="font-medium">Time</Label>
				<Input v-model="time" :defaultValue="time" type="datetime-local" class="h-12 font-medium" placeholder="Time"></Input>
			</div>


			<div class="flex flex-col gap-y-1 w-full">
				<Label class="font-medium">Timezone</Label>
				<Combobox :options="timezoneOptions" :value="timezone" @selected="handleTimezoneSelect"></Combobox>
			</div>
		</div>

		<div class="flex flex-col md:flex-row gap-y-2 gap-x-2 mt-4 w-full md:justify-between">
			<Button @click="calculateExposure" :disabled="isBusy" class="flex gap-x-2">
				<SunIcon/>
				<div>Calculate</div>
			</Button>
			<Button @click="resetForm" :disabled="isBusy" class="flex gap-x-2">
				<ResetIcon/>
				<div>Reset</div>
			</Button>
		</div>

		<div class="flex flex-col gap-y-2">

			<div class="mt-4 py-4 bg-zinc-100 rounded-md px-6" v-if="journeyData">
				<div class="flex gap-x-8 justify-between">
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

			<div class="grid md:grid-cols-3 gap-2 mt-4" v-if="exposureData">
				<Card v-if="exposureData['2']">
					<CardHeader>
						<CardTitle>Left Side</CardTitle>
						<CardDescription>Sun exposure on left side</CardDescription>
					</CardHeader>
					<CardContent class="text-2xl font-semibold text-yellow-600">
						{{ exposureData['2'].toFixed(2) }} %
					</CardContent>
				</Card>

				<Card v-if="exposureData['3']">
					<CardHeader>
						<CardTitle>No Sun</CardTitle>
						<CardDescription>No sun exposure on either sides</CardDescription>
					</CardHeader>
					<CardContent class="text-2xl font-semibold text-[#3b82f6]">
						{{ exposureData['3'].toFixed(2)}} %
					</CardContent>
				</Card>

				<Card v-if="exposureData['1']">
					<CardHeader>
						<CardTitle>Right Side</CardTitle>
						<CardDescription>Sun exposure on right side</CardDescription>
					</CardHeader>
					<CardContent class="text-2xl font-semibold text-[#2f7a04]">
						{{ exposureData['1'].toFixed(2)}} %
					</CardContent>
				</Card>
			</div>
		</div>

	</div>
</template>