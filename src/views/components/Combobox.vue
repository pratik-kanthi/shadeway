<script setup>
import {onMounted, ref} from 'vue'
import {CaretSortIcon, CheckIcon} from '@radix-icons/vue'
import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger,} from '@/components/ui/popover'

const props = defineProps({
	options: Array,
	value: String
});

onMounted(()=>{
	if(props.value){
		selected.value = props.value;
	}
})

const open = ref(false);
const selected = ref('');

const emits = defineEmits(['selected']);
const handleSelect = ()=>{
	open.value = false
	emits('selected', selected);
}


</script>

<template>
	<Popover v-model:open="open">

		<PopoverTrigger as-child>
			<Button variant="outline" role="combobox" :aria-expanded="open"
					class="justify-between h-12 overflow-hidden">
				<div class="flex items-center gap-x-4">
					<span>{{ selected ? selected.label : "Select Timezone" }}</span>
				</div>
				<CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50"/>
			</Button>
		</PopoverTrigger>

		<PopoverContent class="w-[var(--radix-popover-trigger-width)] p-0">
			<Command v-model="selected">
				<CommandInput class="h-12" placeholder="Search timezone..."/>
				<CommandEmpty class="py-4">
					<div class="flex justify-start px-4">
						No zone found.
					</div>
				</CommandEmpty>
				<CommandList>
					<CommandGroup>
						<CommandItem
								v-for="item in options"
								class="h-12 font-medium py-2 px-2 flex items-center gap-x-4"
								:key="item"
								:value="item"
								@select="handleSelect"
						>
							{{ item.label }}
							<CheckIcon :class="cn('ml-auto h-4 w-4', selected  === item ? 'opacity-100' : 'opacity-0')"/>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
</template>