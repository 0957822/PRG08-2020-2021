let nn

function loadData() {
    Papa.parse("./data/weather.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => cleanData(results.data)
    })
}

function cleanData(data) {
    const cleanedData = data.map(day => ({
        MinTemp: day.MinTemp,
        MaxTemp: day.MaxTemp,
        Sunshine: day.Sunshine,
        RainTomorrow: day.RainTomorrow
    }))
        .filter(day => (day.MinTemp != null && day.MaxTemp != null && day.Sunshine != null))
        .filter(day => (!isNaN(day.MinTemp) && !isNaN(day.MaxTemp) && !isNaN(day.Sunshine)))

    console.log(cleanedData)
    createNeuralNetwork(cleanedData)
}

function createNeuralNetwork(data) {
    nn = ml5.neuralNetwork({ task: 'classification', debug: true })

    for (let day of data) {
        const inputs = { MinTemp: day.MinTemp, MaxTemp: day.MaxTemp, Sunshine: day.Sunshine } // TODO moet kloppen met je cleaned data
        const output = { RainTomorrow: day.RainTomorrow }
        nn.addData(inputs, output)
    }

    nn.normalizeData()
    nn.train({ epochs: 16 }, () => classify())
}

function classify() {
    console.log("done training!")

    const input = { MinTemp: 3, MaxTemp: 20, Sunshine: 7 }

    nn.classify(input, (error, result) => {
        console.log(result)
        console.log(`Rain Tomorrow: ${result[0].label}`)
    })

}

loadData()