<script setup>

import {cn} from "@/lib/utils.js";
import {CheckIcon} from "@radix-icons/vue";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "@/components/ui/command/index.js";
import {ref} from "vue";


const selected = ref();
const options = ref(['Mumbai','Bangalore','Delhi','Kolkata','Hyderabad']);
</script>

<template>
	<Command v-model="selected">
		<CommandInput class="h-12" placeholder="Search timezone..."/>
		<CommandEmpty class="py-4">
			<div class="flex justify-start px-4">
				No zone found.
			</div>
		</CommandEmpty>
		<CommandList :dismissable="true">
			<CommandGroup>
				<CommandItem
						v-for="item in options"
						class="h-12"
						:key="item"
						:value="item"
				>
					{{ item }}
					<CheckIcon :class="cn('ml-auto h-4 w-4', selected  === item ? 'opacity-100' : 'opacity-0')"/>
				</CommandItem>
			</CommandGroup>
		</CommandList>
	</Command>
</template>
