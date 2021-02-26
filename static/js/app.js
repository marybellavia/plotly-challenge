d3.json("data/samples.json").then((importedData) => {
    console.log(importedData);
    var data = importedData;

    var testing = data.map(row => row.samples);
    console.log(testing);

});

    // function unpack(rows, index) {
    //     return rows.map(function(row) {
    //     return row[index];
    //     });
    // };

    // var sample_values = unpack(data.sample_values);
    // console.log(sample_values)
// console.log(sample_values);
// var otu_ids = Object.values(data.uk);
// var otu_labels = Object.values(data.canada);