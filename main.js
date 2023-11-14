import './style.css';
import {Bodies, Composite, Engine, Render, Runner, Body, Events} from 'matter-js';

const width = 500;
const height = 800;
let currentBlock = null;
let currentDir = 1;
let interval = null;
let blocks = [];
let score = 0;

const engine = Engine.create();
const render = Render.create({
  engine: engine,
  element: document.getElementById('app'),
  options: {
    width: width,
    height: height,
    wireframes: false
  }
});

Render.run(render);
Runner.run(engine);

const ground = Bodies.rectangle(width / 2, height, width / 1.6, 10, {
  isStatic: true,
  render: { fillStyle: '#E6B143' }
});
const leftWall = Bodies.rectangle(0, height / 2, 10, height, {
  isStatic: true,
  render: { fillStyle: '#E6B143' }
});
const rightWall = Bodies.rectangle(width, height / 2, 10, height, {
  isStatic: true,
  render: { fillStyle: '#E6B143' }
});

Composite.add(engine.world, [ground, leftWall, rightWall]);

window.onkeydown = (event) => {
  switch (event.code) {
    case 'Space':
      currentBlock.isSleeping = false;
      clearInterval(interval);
      interval = null;

      blocks.push(currentBlock);

      setTimeout(() => {
        addBlock();
      }, 1000);
      break;
  }
};

const addBlock = () => {
  const currentSize = Math.floor(40 + Math.random() * 40);

  currentBlock = Bodies.rectangle(width / 2, 50, currentSize, currentSize, {
    isSleeping: true,
    restitution: 0.1,
    friction: 0.4,
  });

  interval = setInterval(() => {
    if (currentDir === -1 && currentBlock.position.x < currentSize) {
      currentDir = 1;
    } else if (currentDir === 1 && currentBlock.position.x > width - currentSize) {
      currentDir = -1;
    }

    Body.setPosition(currentBlock, {
      x: currentBlock.position.x + currentDir,
      y: currentBlock.position.y,
    });
  }, 1);

  Composite.add(engine.world, currentBlock);
};

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    const block = Bodies.rectangle(width / 2 + Math.random() * 2 - 0.5, 0, 40, 40, {
      restitution: 0.1,
      friction: 0.4,
    });

    Composite.add(engine.world, [block]);

    blocks.push(block);
  }, i * 500)
}

// Game start
setTimeout(() => {
  addBlock();

  setInterval(() => {
    let minY = height;
  
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].position.y < minY) {
        minY = blocks[i].position.y;
      }
    }
  
    score = Math.floor(height - minY);
  }, 500);
}, 5500);

// Score
Events.on(render, 'afterRender', () => {
  let ctx = render.context;
  ctx.fillStyle = 'white';
  ctx.font = '30px ZenDots';
  ctx.textAlign = 'right';
  ctx.fillText(`${score}`, width - 50, 50);
});
