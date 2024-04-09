import axios from "axios";

export const searchPlaces = async (searchQuery)=>{
	const result = await axios.post(`https://exposure-calculator.shadeway.workers.dev/address-search`,{
		searchQuery: searchQuery,
	});

	return result.data;
}


export const getPlaceDetails = async (placeId)=>{
	const result = await axios.get(`https://exposure-calculator.shadeway.workers.dev/place-details?placeId=${placeId}`);

	return result.data;
}