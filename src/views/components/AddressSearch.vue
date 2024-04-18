<script setup>
import {ref} from 'vue'
import {CaretSortIcon, CheckIcon, DrawingPinIcon} from '@radix-icons/vue'
import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger,} from '@/components/ui/popover'
import {getPlaceDetails, searchPlaces} from "@/services/addressService.js";
import { useDebounceFn } from '@vueuse/core'


const addressSuggestions = ref([]);
const open = ref(false);
const selected = ref('');
const searchText = ref('');

const emits = defineEmits(['selected']);

const handleSelect = async (ev) => {
	selected.value = ev.detail.value
	open.value = false;
	const placeDetails = await getPlaceDetails(selected.value.id);
	selected.value.location = placeDetails.location;

	emits('selected', selected.value.location)
};


const handleChange = async (value)=>{
	searchText.value = value;
	const result = await searchPlaces(searchText.value);
	addressSuggestions.value = result.suggestions.map(sug=>{
		return {
			id: sug.placePrediction.placeId,
			label: sug.placePrediction.text.text
		}
	})
}
const debouncedHandleChange = useDebounceFn(handleChange, 200);

</script>

<template>
	<Popover v-model:open="open">

		<PopoverTrigger as-child>
			<Button variant="outline" role="combobox" :aria-expanded="open" class="justify-between h-12 overflow-hidden">
				<div class="flex items-center gap-x-4">
					<DrawingPinIcon></DrawingPinIcon>
					<span>{{ selected ? selected.label : "Search address" }}</span>
				</div>
				<CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50"/>
			</Button>
		</PopoverTrigger>

		<PopoverContent class="w-[var(--radix-popover-trigger-width)] p-0">
			<Command v-model="searchText" @update:searchTerm="debouncedHandleChange">
				<CommandInput  class="h-12" placeholder="Search address..."/>
				<CommandEmpty class="py-4">
					<div class="flex justify-start px-4">
						No address found.
					</div>
				</CommandEmpty>
				<CommandList>
					<CommandGroup>
						<CommandItem
								class="h-14 font-medium py-2 px-2 flex items-center gap-x-4"
								v-for="address in addressSuggestions"
								:key="address.id"
								:value="address"
								@select="handleSelect"
						>
							<div><img class="w-4 h-4" src="@/assets/google-map-icon.svg?url"></div>
							<div>{{ address.label }}</div>
							<CheckIcon :class="cn('ml-auto h-4 w-4', selected.id === address.id ? 'opacity-100' : 'opacity-0')"/>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
</template>