import './css/main.css'
import * as PIXI from 'pixi.js'
import TweenMax, { Expo } from 'gsap'


const randomInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min

// Destructuring
const { Application, Container } = PIXI
const { innerWidth: WIDTH, innerHeight: HEIGHT } = window

// APP
const app = new Application({
    width: WIDTH,
    height: HEIGHT,
    antialias: true,
    resolution: 1,
    view,
    transparent: true 
})

// Main Stage
const Stage = app.stage;

const container = new Container()

// Set width / height of container
container.width = WIDTH
container.height = HEIGHT

const graphics = []

for (let i = 0; i < 7; i++) {
    const width = 200
    const height = 200
    const spacing = 20
    const x = randomInteger(0, WIDTH)
    const y = randomInteger(0, HEIGHT)

    const rect = new PIXI.Graphics()
    rect.beginFill(Math.random() * 0xFFF000)
    rect.drawRect(0, 0, width, height)
    rect.endFill()

    rect.x = x
    rect.y = y
    
    rect.interactive = true
    rect.buttonMode = true

    // Push each rect to array
    graphics.push({
        rect: rect,
        x: x,
        y: y,
        width: width,
        height: height,
    })
    
    container.addChild(rect)
}

graphics.forEach((graphic, index) => {
    const { x, y, rect, width, height } = graphic
    const newWidth = width + 200
   rect.on('pointertap', () => {
        TweenMax.to(rect, 1, {
           x: (WIDTH/2) - (newWidth/2),
           y: (HEIGHT/2) - (height/2),
           width: newWidth,
           height: 300,
           ease: Expo.easeInOut
        })
    })
})

Stage.addChild(container)


