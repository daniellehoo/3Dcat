// declare global variables
let particles = []
let luckyCat
let cats = []
let lotus
let modelArray = []

// this class describes the properties of a single particle.
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
  constructor () {
    this.x = random(-windowWidth, windowWidth)
    this.y = random(windowHeight / 2, -windowHeight / 2)
    this.r = random(1, 8)
    this.xSpeed = random(-2, 2)
    this.ySpeed = random(-1, 1.5)
  }

  // creation of a particle.
  createParticle () {
    noStroke()
    fill('rgba(200,169,169,0.5)')
    rect(this.x, this.y, 3, 3)
  }

  // setting the particle in motion.
  moveParticle () {
    if (this.x < 0 || this.x > width) this.xSpeed *= -1
    if (this.y < 0 || this.y > height) this.ySpeed *= -1
    this.x += this.xSpeed
    this.y += this.ySpeed
  }

  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart
  joinParticles (particles) {
    particles.forEach(element => {
      let dis = dist(this.x, this.y, element.x, element.y)
      if (dis < 85) {
        stroke('rgba(255,255,255,0.04)')
        line(this.x, this.y, element.x, element.y)
      }
    })
  }
}

// this class describes a new instance of a cat
class Cat {
  constructor (x, y, model) {
    this.position = createVector(x, y)
    this.velocity = createVector(randomGaussian(0, 5), 0)
    this.model = model
  }
  update () {
    this.position.add(this.velocity)
    if (this.position.y > windowHeight - 5) {
      if (this.velocity.y > 5) {
        this.velocity.y *= -0.5
        this.velocity.x *= 0.5
      } else {
        this.velocity.x = 0
      }
      this.position.y = windowHeight - 5
    } else {
      this.velocity.add(createVector(0, 1))
    }
  }

  render () {
    normalMaterial() // For effect
    // rotateX(sin(frameCount * 0.01))
    // rotateY(tan(frameCount * 0.01))
    push()
    rotate(180)
    translate(mouseX, mouseY)
    model(this.model)
    pop()
    // rotateZ(frameCount * 0.01)
  }
}

function preload () {
  luckyCat = modelArray.push(loadModel('assets/luckycat.obj', true))
  lotus = modelArray.push(loadModel('assets/lotus.obj', true))
}

function setup () {
  createCanvas(windowWidth, windowHeight, WEBGL)
  angleMode(DEGREES)
  for (let i = 0; i < width / 10; i++) {
    particles.push(new Particle())
  }
}

function draw () {
  background('#0f0f0f')
  for (let i = 0; i < particles.length; i++) {
    particles[i].createParticle()
    particles[i].moveParticle()
    particles[i].joinParticles(particles.slice(i))
  }
  //   cone(40, 70)

  // for (let x = 0; x < 10; x++){
  //     rotateX(frameCount * 0.01)
  //     rotateY(frameCount * 0.01)
  //     // rotateZ(frameCount * 0.01)
  //     normalMaterial() // For effect
  //     // translate(-275, 175)
  //     model(luckyCat)

  // }

  for (cat of cats) {
    cat.update()
    cat.render()
  }

  // rotateX(frameCount * 0.01)
  // rotateY(frameCount * 0.01)
  // // rotateZ(frameCount * 0.01)
  // normalMaterial() // For effect
  // push()
  // translate(-275, 175)
  // model(luckyCat)
  // pop()
  // model(lotus)
}

function mouseClicked () {
  // rotate(PI / 3.0)

  cats.push(new Cat(mouseX, mouseY, randomModel()))
  //   console.log(Cat)
}

function randomModel () {
  return modelArray[Math.floor(Math.random() * modelArray.length)]
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight)
}
