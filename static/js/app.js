
// d3.selectAll("#selDataset").on("change", buildCharts);

function buildCharts(sample) {
     // Use d3.json to load the samples.json file 
    d3.json("data/samples.json").then((data) => {
        console.log(data);
        // Create a variable that holds the samples array. 
        var samples = data.samples;
        // console.log(samples);
        
        // Create a variable that filters the samples for the object with the desired sample number.
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];

        // Slice the first 10 objects for plotting
        var slicedSampleValues = result.sample_values.slice(0, 10);
        console.log(slicedSampleValues);
        var slicedOtuIds = result.otu_ids.slice(0, 10);
        console.log(slicedOtuIds);
        var slicedOtuLabels = result.otu_labels.slice(0, 10);
        console.log(slicedOtuLabels);

        // Trace1 for the sample Data
        var trace1 = {
            x: slicedSampleValues,
            y: slicedOtuIds.map(String),
            text: slicedOtuLabels,
            name: "Bar Charts",
            type: "bar",
            orientation: "h"
        };

        // data
        var chartData = [trace1];

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", chartData);
    });
};

buildCharts(940);


// d3.json("data/samples.json").then((importedData) => {
//     console.log(importedData);
//     var data = importedData.samples;

//     var sample_values = data.filter(sample_values);
//     console.log(sample_values);

// });