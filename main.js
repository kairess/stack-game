import './style.css';
import {Bodies, Composite, Engine, Render, Runner} from 'matter-js';

const engine = Engine.create();
const render = Render.create({
  engine: engine,
  element: document.getElementById('app'),
  options: {
    width: 600,
    height: 800,
    wireframes: false
  }
});

Render.run(render);
Runner.run(engine);

const ground = Bodies.rectangle(300, 800, 600, 10, {
  isStatic: true,
  render: { fillStyle: '#E6B143' }
});
const leftWall = Bodies.rectangle(0, 400, 10, 800, {
  isStatic: true,
  render: { fillStyle: '#E6B143' }
});
const rightWall = Bodies.rectangle(600, 400, 10, 800, {
  isStatic: true,
  render: { fillStyle: '#E6B143' }
});

Composite.add(engine.world, [ground, leftWall, rightWall]);

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    const body = Bodies.rectangle(300 + i, 0, 40, 40, {
      restitution: 0.25,
    });

    Composite.add(engine.world, [body]);
  }, i * 500)
}
