// globale variabele declareren
let nn
let classifier
let TalkNow

// synth roept de speech aan
// inputfield/playbutton halen elemten op uit de html
let synth = window.speechSynthesis
let inputField = document.querySelector("#inputfield")
let playButton = document.querySelector("#playbutton")

// model inladen vanuit de ml5 library
function loadModel() {
    classifier = ml5.imageClassifier('MobileNet', modelLoaded)
}

//
function modelLoaded() {
    console.log('Model Loaded!')
    classifyImage('image')
}

function classifyImage(id) {
    classifier.classify(document.getElementById(id), (err, results) => {
        console.log(results)
        console.log(results[0].label)
        console.log((results[0].confidence * 100).toFixed(2))
        TalkNow = results[0].label
    })
}

playButton.addEventListener("click", () => {
    speak(TalkNow)
})

const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event)=>loadFile(event))

function loadFile(event) {
	image.src = URL.createObjectURL(event.target.files[0])
}

image.addEventListener('load', () => userImageUploaded())

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
    classifyImage('output')
}

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        utterThis.lang = 'es-ES'
        synth.speak(utterThis)
    }
}

loadModel()