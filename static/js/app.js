// initializes the page with a default plot
function init() {
    selectPopulate();
    populateDemoInfo(940);
    buildCharts(940);  
};

// when a change takes place in the DOM redo the plotly charts
function optionChanged(sampleNum) {
    populateDemoInfo(sampleNum);
    buildCharts(sampleNum); 
};

// populating the select in the html wit hthe IDs from the dataset
function selectPopulate() {
    // using d3.json to load the samples.json file
    d3.json("data/samples.json").then((data) => {
        // creating a variable that holds the samples array. 
        var names = data.names;
        // grabbing the html element for use in the loop
        var selDataset = d3.select("#selDataset");
        // loop to create the drop down menu
        names.forEach(name => {
            selDataset.append("option").text(name).property("value", name);
        });
    });
};

function populateDemoInfo(sampleNum) {
    // using d3.json to load the samples.json file
    d3.json("data/samples.json").then((data) => {
        console.log(data);
        // creating a variable that holds the samples array. 
        var metadata = data.metadata;        
        // creating a variable that filters the samples for the object with selected sample #
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sampleNum);
        var result = resultArray[0];
        // selecting div and printing listing results on demo info
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
        // creating a variable that holds the samples array. 
        var samples = data.samples;
        // creating a variable that filters the samples for the object with selected sample #
        var resultArray = samples.filter(sampleObj => sampleObj.id == sampleNum);
        var result = resultArray[0];
        // slicing the first 10 objects for bar plotting
        var slicedSampleValues = result.sample_values.slice(0, 10).reverse();
        var slicedBarOtuIds = result.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()
        var slicedOtuLabels = result.otu_labels.slice(0, 10);
        // creating variables for bubble chart
        var BubbleSampleValues = result.sample_values;
        var BubbleOtuIds = result.otu_ids;
        var BubbleLabels = result.otu_labels;
        // creating traces
        // bar
        var barTrace = {
            x: slicedSampleValues,
            y: slicedBarOtuIds,
            text: slicedOtuLabels,
            name: "Bar Chart",
            type: "bar",
            orientation: "h"
        };
        // bubble
        var bubbleTrace = {
            x: BubbleOtuIds,
            y: BubbleSampleValues,
            text: BubbleLabels,
            mode: 'markers',
            marker: {
                color: BubbleOtuIds,
                size: BubbleSampleValues,
                colorscale: "Electric"
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
            width: 1000
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