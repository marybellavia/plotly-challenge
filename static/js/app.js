
// initializes the page with a default plot
function init() {
    populateDemoInfo(940);
    buildCharts(940);  
};

// // when a change takes place in the DOM redo the plotly charts
// d3.selectAll("#selDataset").on("change", buildCharts(getSampleNum));

// function getSampleNum() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");

//     return dataset;
// };

function populateDemoInfo(sampleNum) {

    d3.json("data/samples.json").then((data) => {
        // console.log(data);
        // creating a variable that holds the samples array. 
        var metadata = data.metadata;
        // console.log(samples);
        
        // creating a variable that filters the samples for the object with selected sample #
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sampleNum);
        var result = resultArray[0];
        // console.log(result);

        // selecting div and listing results on demo info
        var demoInfo = d3.select(".panel-body");
        demoInfo.html("");
        demoInfo.append("p").text(`id: ${result.age}`);
        demoInfo.append("p").text(`ethnicity: ${result.ethnicity}`);
        demoInfo.append("p").text(`gender: ${result.gender}`);
        demoInfo.append("p").text(`age: ${result.age}`);
        demoInfo.append("p").text(`location: ${result.location}`);
        demoInfo.append("p").text(`bbtype: ${result.bbtype}`);
        demoInfo.append("p").text(`wfreq: ${result.wfreq}`);
    });
};

function buildCharts(sampleNum) {
     // using d3.json to load the samples.json file 
    d3.json("data/samples.json").then((data) => {
        // console.log(data);
        // creating a variable that holds the samples array. 
        var samples = data.samples;
        // console.log(samples);
        
        // creating a variable that filters the samples for the object with selected sample #
        var resultArray = samples.filter(sampleObj => sampleObj.id == sampleNum);
        var result = resultArray[0];

        // Slicing the first 10 objects for plotting
        var slicedSampleValues = result.sample_values.slice(0, 10);
        // console.log(slicedSampleValues);
        var slicedOtuIds = result.otu_ids.slice(0, 10);
        // console.log(slicedOtuIds);
        var slicedOtuLabels = result.otu_labels.slice(0, 10);
        // console.log(slicedOtuLabels);

        // creating traces
        // bar
        var barTrace = {
            x: slicedSampleValues,
            y: slicedOtuIds.map(String),
            text: slicedOtuLabels,
            name: "Bar Chart",
            type: "bar",
            orientation: "h"
        };
        // bubble
        var bubbleTrace = {
            x: slicedOtuIds,
            y: slicedSampleValues,
            // text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
            mode: 'markers',
            marker: {
                // color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                size: slicedSampleValues
            }
        };

        // creating layouts
        // bar 
        var barLayout = {
            title: "Bar Chart",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
          };
        // bubble
        var bubbleLayout = {
            title: 'Bubble Chart',
            showlegend: false,
            height: 600,
            width: 600
            };

          
        // creating data's for plotly
        // bar
        var barData = [barTrace];
        // bubble
        var bubbleData = [bubbleTrace];
          
        // Rendering plots
        Plotly.newPlot("bar", barData, barLayout);
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // calling the function to update the demographic info
        populateDemoInfo(sampleNum);
    });
};

init();