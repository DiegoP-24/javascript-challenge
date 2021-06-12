// from data.js
const tableData = data;

// YOUR CODE HERE!
const tbody = d3.select("tbody");
const button = d3.select("#filter-btn");
const inputField1 = d3.select("#datetime");
const inputField2 = d3.select("#city");
const resetbtn = d3.select("#reset-btn");
const columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

const populate = (dataInput) => {
	dataInput.forEach(ufo_sightings => {
		const row = tbody.append("tr");
		columns.forEach(column => row.append("td").text(ufo_sightings[column])
		)
	});
}

//Populate table
populate(data);

// Filter attributes
button.on("click", () => {
	d3.event.preventDefault();
	const inputDate = inputField1.property("value").trim();
	const inputCity = inputField2.property("value").toLowerCase().trim();
	// Filter by field, matching the input value
	const filterDate = data.filter(data => data.datetime === inputDate);
	console.log(filterDate)
	const filterCity = data.filter(data => data.city === inputCity);
	console.log(filterCity)
	const filterData = data.filter(data => data.datetime === inputDate && data.city === inputCity);
	console.log(filterData)

	// Filter table
	tbody.html("");

	let response = {
		filterData, filterCity, filterDate
	}
	if (response.filterData.length !== 0) {
		populate(filterData);
	}
		else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
			populate(filterCity) || populate(filterDate);
		}
		else {
			tbody.append("tr").append("td").text("No results available!"); 
		}
})

// Reset table
resetbtn.on("click", () => {
	tbody.html("");
	populate(data)
	console.log("Table reset")
})