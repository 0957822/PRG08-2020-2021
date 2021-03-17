import { VegaScatterplot } from "./libraries/vegascatterplot.js"
import { createFakedata } from "./libraries/fakedata.js"

let nn
let fakeData = createFakedata()
let plot

console.log(fakeData);

//
// teken de scatterplot voor de fake data
//
async function drawScatterPlot() {
    plot = new VegaScatterplot()
    // await plot.initialise("horsepower", "mpg", 600, 400, fakeData)

}

//
// maak en train het neural network
//
async function createNeuralNetwork() {
    // maak neural network
    const options = { task: 'regression', debug: true }
    const nn = ml5.neuralNetwork(options)

    // shuffle
    fakeData.sort(() => (Math.random() - 0.5))

    // een voor een de training data toevoegen aan het neural network
    for (let car of fakeData) {
        nn.addData({ horsepower: car.horsepower }, { mpg: car.mpg })
    }

    // voeg data toe aan neural network met addData
    for (let row of fakeData) {
        // nn.addData({ horsepower: row.horsepower }, { mpg: row.mpg })
    }

    // train + normalize neural network
    nn.normalizeData()
    nn.train({ epochs: 10 }, () => finishedTraining())

    function finishedTraining() {
        console.log("Finished training!")
    }
}


//
// predictions
//
async function trainingFinished() {
    // doe een enkele voorspelling om te zien of alles werkt
    let testCar = { horsepower: 220 }

    async function trainingFinished() {
    let testCar = { horsepower: 90 }

    const results = await nn.predict(testCar)
    console.log(results)

    const prediction = results[0].value
    console.log(`Deze auto zal een verbruik hebben van: ${prediction}`)
}




    // maak een voorspelling voor elk punt op de X as
    let predictions = []
    for (let i = 0; i < 400; i++) {
        // let prediction = ....
        // predictions.push(...)
    }


    // stuur nu de hele predictions array naar de scatterplot met "plot.addPoints"
    // ...
}

// start de applicatie
<<<<<<< HEAD
// drawScatterPlot()
createNeuralNetwork()
=======
// drawScatterPlot()
>>>>>>> afa7441b8ae0046f7692a075108eadaf0a85cced
