<script setup lang="ts">
import {Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,} from '@/components/ui/drawer'

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true,
	},
})

const emit = defineEmits(['update:modelValue'])

const toggleDrawer = (val) => {
	emit('update:modelValue', val)
}
</script>

<template>
	<Drawer v-model="props.modelValue" @open="toggleDrawer">
		<DrawerContent class="md:h-3/4 focus:outline-none">
			<DrawerHeader>
				<DrawerTitle class="text-center">How does it work?</DrawerTitle>
				<DrawerDescription>
					<div class="text-base text-left font-medium mx-auto w-full md:w-1/2 px-4 py-6">

						<div class="mt-4">It may seem rather tedious to determine the exact position of the Sun at any
							given point on earth for a given time but with some trigonometry it's quite simple.
						</div>

						<div class="mt-4">
							<label class="my-2">Shadeway works by calculating three important parameters at any
								location</label>
							<ul class="my-2">
								<li class="underline"><a target="_blank"
														 href="https://en.wikipedia.org/wiki/Solar_azimuth_angle"> Solar
									Azimuth angle </a></li>
								<li class="underline"><a target="_blank"
														 href="https://en.wikipedia.org/wiki/Solar_zenith_angle"> Solar
									Zenith Angle</a></li>
								<li class="underline"><a target="_blank"
														 href="https://en.wikipedia.org/wiki/Bearing_(angle)#Relative">Bearing
									of your vehicle </a></li>
							</ul>

							<p class="mt-4">With these parameters determined at every location and with the help of a
								direction service, we can calculate how much sunlight would each side of vehicle receive
								throughout the journey</p>

							<div class="font-semibold text-lg text-black mt-4">Credits</div>
							<p>This app wouldn't be possible without the excellent articles by <b>Astronomy Answers</b>
								about the position of the Sun and planets detailed <a class="underline" target="_blank"
																					  href="https://aa.quae.nl/en/reken/zonpositie.html">here</a>
							</p>

						</div>
					</div>
				</DrawerDescription>
			</DrawerHeader>
		</DrawerContent>
	</Drawer>
</template>