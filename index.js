// works best with chrome, no save dialogue

// TODO: first try to combine them into a pdf manually and print that way instead of automating it for no reason
// TODO: instead of saving, make them print
// TODO: maybe we need to save to pdf then print?

// TODO: allow the to upload csv file so they can change what gets printed

/*
  Workflow:

  - Use chrome, change download settings to not ask to save each file before downloading
  - set the loadTable('path to csv'), make sure you only include ones you want to print
  - once the csv is loaded the page will say "done loading"
  - then you can click "download images" and the images will be saved to your downloads folder
  - depending on how many images there are it might take a while
  - it might be best to do it while not using the machine
*/

let img;
let sheet;
let delay;
let load;
let download;
let input;
let loadSheet;
let table;

preload = () => {
  img = loadImage('../static/scantron.jpg');

  // NOTE: enter the csv path below
  sheet = loadTable('../static/roster-small.csv', 'csv', 'header', () => createElement('p', "done loading"));

  // input = createFileInput(handleFile);
  // input.position(10, 10);

  // function handleFile(file) {
  //   print(file);
  //   // TODO: getting strange error when loading
  //   // table = file;
  //   sheet = loadTable(file.data, 'csv', 'header', () => createElement('p', "done loading"));
  // }

};

setup = () => {
  createCanvas(3300, 2550);

  // loadSheet = createButton('Load Table')
  // loadSheet.position(400, 10);
  // loadSheet.mousePressed(() => {
  //   sheet = loadTable(table.data, 'csv', 'header', () => createElement('p', "done loading"));
  // })

  download = createButton('download images')
  download.position(180, 10);
  download.mousePressed(() => {
    const students = [];
    //sheet.getColumn('Last Name').length
    for (let i = 0; i < sheet.getColumn('Last Name').length; i++) {
      setTimeout(() => {
        students[i] = new Student();

        students[i].drawStudent(
          students[i].getStudent().student[i],
          students[i].getStudent().division[i],
          students[i].getStudent().schoolCode[i],
          students[i].getStudent().testCode[i]
        );
        save(`${students[i].name}.png`);
      }, 100);
    }
  })

};

class Student {
  constructor(rangeL, rangeH) {
    this.rangeL = rangeL;
    this.rangeH = rangeH;
  }

  // background() {
  //   push();
  //   // scale(0.5, 0.5);

  //   image(img, 0, 0);
  //   pop();
  // }

  getStudent() {
    let student = [];
    let division = [];
    let schoolCode = [];
    let testCode = [];

    sheet.getColumn('Last Name').forEach((x, i) => {
      student[i] = x.concat(' ', sheet.getColumn('First Name')[i]);
      division[i] = sheet.getColumn('Division')[i];
      schoolCode[i] = sheet.getColumn('School Code')[i];
      testCode[i] = sheet.getColumn('Test Code')[i];
    });

    return {
      student,
      division,
      schoolCode,
      testCode
    };
  }

  drawStudent(name, division, schoolCode, testCode) {
    this.name = name;
    this.division = division;
    this.schoolCode = schoolCode;
    this.testCode = testCode;

    // draw a while bg, when saved as png it is transparent
    background(255, 255, 255);
    textSize(18);

    // Draw text and bubbles
    for (let i = 0; i < this.name.length; i++) {

      // scale everything
      push()
      scale(4, 4);

      //Name
      push();
      translate(35, 66);
      text(this.name[i], 15 * i, 0);
      pop();

      push();
      translate(39.5, 79);
      fill(0);
      this.getNameBubbles(this.name[i].toLowerCase(), i);
      pop();

      //Division
      push()
      translate(125, 465)
      text(this.division[i], i, 0);
      pop()

      //to stop it from drawing when there's no data in division
      if (i < this.division.length) {
        push();
        translate(125 + 4.5, 465 + 13);
        fill(0);
        this.getNumberBubbles(this.division[i], i);
        pop();
      }

      //School Code
      push()
      translate(138, 465)
      text(this.schoolCode[i], i * 15, 0);
      pop()

      if (i < this.schoolCode.length) {
        push()
        translate(138 + 6, 465 + 13)
        fill(0)
        this.getNumberBubbles(this.schoolCode[i], i);
        pop()
      }

      //Test code
      push()
      translate(290, 465)
      text(this.testCode[i], i * 15, 0);
      pop()

      if (i < this.testCode.length) {
        push()
        translate(290 + 5, 465 + 13)
        fill(0)
        this.getNumberBubbles(this.testCode[i], i);
        pop()
      }
      pop()
    }
  }

  getNameBubbles(letter, index) {
    this.letter = letter;
    this.index = index;

    const d = {
      x: 15.03,
      y: 12.45
    };
    const s = 7.3;

    const name = letter => ({
      ' ': () => ellipse(d.x * this.index, d.y * 0, s), // handle space
      "'": () => ellipse(d.x * this.index, d.y * 0, s), // Capturing a '
      '’': () => ellipse(d.x * this.index, d.y * 0, s), // Capturing a ’
      '-': () => ellipse(d.x * this.index, d.y * 0, s), // treat '-' as a blank
      '.': () => ellipse(d.x * this.index, d.y * 0, s), // treat '.' as a blank
      ',': () => ellipse(d.x * this.index, d.y * 0, s), // treat '.' as a blank
      'a': () => ellipse(d.x * this.index, d.y * 1, s),
      'b': () => ellipse(d.x * this.index, d.y * 2, s),
      'c': () => ellipse(d.x * this.index, d.y * 3, s),
      'd': () => ellipse(d.x * this.index, d.y * 4, s),
      'e': () => ellipse(d.x * this.index, d.y * 5, s),
      'é': () => ellipse(d.x * this.index, d.y * 5, s), // convert to normal e
      'f': () => ellipse(d.x * this.index, d.y * 6, s),
      'g': () => ellipse(d.x * this.index, d.y * 7, s),
      'h': () => ellipse(d.x * this.index, d.y * 8, s),
      'i': () => ellipse(d.x * this.index, d.y * 9, s),
      'j': () => ellipse(d.x * this.index, d.y * 10, s),
      'k': () => ellipse(d.x * this.index, d.y * 11, s),
      'l': () => ellipse(d.x * this.index, d.y * 12, s),
      'm': () => ellipse(d.x * this.index, d.y * 13, s),
      'n': () => ellipse(d.x * this.index, d.y * 14, s),
      'o': () => ellipse(d.x * this.index, d.y * 15, s),
      'p': () => ellipse(d.x * this.index, d.y * 16, s),
      'q': () => ellipse(d.x * this.index, d.y * 17, s),
      'r': () => ellipse(d.x * this.index, d.y * 18, s),
      's': () => ellipse(d.x * this.index, d.y * 19, s),
      't': () => ellipse(d.x * this.index, d.y * 20, s),
      'u': () => ellipse(d.x * this.index, d.y * 21, s),
      'v': () => ellipse(d.x * this.index, d.y * 22, s),
      'w': () => ellipse(d.x * this.index, d.y * 23, s),
      'x': () => ellipse(d.x * this.index, d.y * 24, s),
      'y': () => ellipse(d.x * this.index, d.y * 25, s),
      'z': () => ellipse(d.x * this.index, d.y * 26, s),
    })[letter];

    return name(letter)();
  }

  getNumberBubbles(letter, index) {
    this.letter = letter;
    this.index = index;
    console.log(letter)
    const d = {
      x: 15.03,
      y: 12.45
    };
    const s = 7.3;

    const name = letter => ({
      '0': () => ellipse(d.x * this.index, d.y * 0, s),
      '1': () => ellipse(d.x * this.index, d.y * 1, s),
      '2': () => ellipse(d.x * this.index, d.y * 2, s),
      '3': () => ellipse(d.x * this.index, d.y * 3, s),
      '4': () => ellipse(d.x * this.index, d.y * 4, s),
      '5': () => ellipse(d.x * this.index, d.y * 5, s),
      '6': () => ellipse(d.x * this.index, d.y * 6, s),
      '7': () => ellipse(d.x * this.index, d.y * 7, s),
      '8': () => ellipse(d.x * this.index, d.y * 8, s),
      '9': () => ellipse(d.x * this.index, d.y * 9, s),
    })[letter];

    return name(letter)();
  }
}