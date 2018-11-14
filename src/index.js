import p from 'p5/lib/p5.min';

const sketch = (p) => {
  let img;
  p.preload = () => {
    img = p.loadImage('../static/scantron.jpg');
  };
  p.setup = () => {
    p.createCanvas(825, 625);
    p.background(0);
    // scantron background
    p.push();
    p.scale(0.25, 0.25);
    p.image(img, 0, 0);
    p.pop();

    p.textSize(18);

    // print any text to the name spaces on the scantron
    const text = 'Donald Duck';
    p.push();
    p.translate(35, 66);
    for (let i = 0; i < text.length; i++) {
      p.text(text[i], 15 * i, 0);
    }
    p.pop();

    const bubbleDistance = {x: 15.03, y: 12.45};
    const bubbleSize = 7.3;

    // TODO: skip blank spaces unless there is a blank
    // TODO: if there is a blank fill in the blank
    p.push();

    p.translate(39.5, 79);
    p.fill(0);
    for (let i = 0; i < text.length; i++) {
      p.name(text[i].toLowerCase(), bubbleDistance, i, bubbleSize)();

      // if (text[i] === ' ') {
      //   console.log('space');
      // } else {
      // }
    }
    p.pop();

    p.saveCanvas(text, 'jpg');

    // p.fillAll(bubbleDistance, bubbleSize);
  };

  // TODO: how do i iterate letters so i can shorten this?
  p.name = (letter, d, index, s) => ({
    ' ': () => p.ellipse(d.x * index, d.y * 0, s),
    'a': () => p.ellipse(d.x * index, d.y * 1, s),
    'b': () => p.ellipse(d.x * index, d.y * 2, s),
    'c': () => p.ellipse(d.x * index, d.y * 3, s),
    'd': () => p.ellipse(d.x * index, d.y * 4, s),
    'e': () => p.ellipse(d.x * index, d.y * 5, s),
    'f': () => p.ellipse(d.x * index, d.y * 6, s),
    'g': () => p.ellipse(d.x * index, d.y * 7, s),
    'h': () => p.ellipse(d.x * index, d.y * 8, s),
    'i': () => p.ellipse(d.x * index, d.y * 9, s),
    'j': () => p.ellipse(d.x * index, d.y * 10, s),
    'k': () => p.ellipse(d.x * index, d.y * 11, s),
    'l': () => p.ellipse(d.x * index, d.y * 12, s),
    'm': () => p.ellipse(d.x * index, d.y * 13, s),
    'n': () => p.ellipse(d.x * index, d.y * 14, s),
    'o': () => p.ellipse(d.x * index, d.y * 15, s),
    'p': () => p.ellipse(d.x * index, d.y * 16, s),
    'q': () => p.ellipse(d.x * index, d.y * 17, s),
    'r': () => p.ellipse(d.x * index, d.y * 18, s),
    's': () => p.ellipse(d.x * index, d.y * 19, s),
    't': () => p.ellipse(d.x * index, d.y * 20, s),
    'u': () => p.ellipse(d.x * index, d.y * 21, s),
    'v': () => p.ellipse(d.x * index, d.y * 22, s),
    'w': () => p.ellipse(d.x * index, d.y * 24, s),
    'x': () => p.ellipse(d.x * index, d.y * 25, s),
    'y': () => p.ellipse(d.x * index, d.y * 26, s),
    'z': () => p.ellipse(d.x * index, d.y * 27, s)
  })[letter];

  p.fillAll = (d, s) => {
    p.push();
    p.translate(39.5, 79);
    p.fill(0);
    for (let i = 0; i < 27; i++) {
      for (let j = 0; j < 21; j++) {
        p.ellipse(d.x * j, d.y * i, s);
      }
    }
    p.pop();
  };
};

export default sketch;

new p(sketch);
