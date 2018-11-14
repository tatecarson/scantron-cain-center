import p from 'p5/lib/p5.min';

const sketch = (p) => {
  let img;
  p.preload = () => {
    img = p.loadImage('../static/scantron.jpg');
  };
  p.setup = () => {
    p.createCanvas(900, 800);

    // scantron background
    p.push();
    p.scale(0.25, 0.25);
    p.image(img, 0, 0);
    p.pop();

    p.textSize(18);

    const text = 'hi hi hi';

    p.translate(35, 66);
    for (let i = 0; i < text.length; i++) {
      p.text(text[i], 15 * i, 0);
    }
  };
};

export default sketch;

new p(sketch);
