import p from 'p5/lib/p5.min';

// TODO: convert to canvas-sketch ith p5 in order to use the save feature
// ex: https://github.com/mattdesl/canvas-sketch/blob/master/examples/animated-p5-instance.js

const sketch = (p) => {
  let img;
  let sheet;

  p.preload = () => {
    sheet = p.loadTable('../static/roster.csv', 'csv', 'header');
    img = p.loadImage('../static/scantron.jpg');
  };
  p.setup = () => {
    p.createCanvas(825, 625);

    // scantron background
    p.push();
    p.scale(0.25, 0.25);
    p.image(img, 0, 0);
    p.pop();

    p.textSize(18);

    // print any text to the name spaces on the scantron

    let student = p.getStudent()[3];
    p.drawStudent(student);

    // still makes dialogue pop up
    p.save(`${student}.jpg`);

    // TODO: can saveCanvas be used without save as?
    // p.getStudent().forEach(student => {
    //   p.drawStudent(student);
    //   p.save(student, 'jpg');
    // });
  };

  p.getStudent = () => {
    let student = [];
    sheet.getColumn('Last Name').forEach((x, i) => {
      student[i] = x.concat(' ', sheet.getColumn('First Name')[i]);
    });
    return student;
  };

  p.drawStudent = name => {
    for (let i = 0; i < name.length; i++) {
      p.push();
      p.translate(35, 66);
      p.text(name[i], 15 * i, 0);
      p.pop();

      p.push();
      p.translate(39.5, 79);
      p.fill(0);
      p.getBubbles(name[i].toLowerCase(), i);
      p.pop();
    }
  };

  p.getBubbles = (letter, index) => {
    const d = {x: 15.03, y: 12.45};
    const s = 7.3;

    const name = letter => ({
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

    return name(letter)();
  };

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
