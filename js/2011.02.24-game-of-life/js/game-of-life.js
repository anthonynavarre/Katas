/*jslint plusplus: false */

var Life = function (canvas) {
  var base = this;

  base.GRID_VISIBLE = false;
  base.GRID_SPACING = 10;

  base.cells = [];
  base.canvas = canvas;
  base.context = canvas.getContext('2d');
  base.width = canvas.getAttribute('width');
  base.height = canvas.getAttribute('height');

  // set up grid
  base.fillStyle = '#000';

  if (base.GRID_VISIBLE) {
    console.log('drawing grid');
    base.context.strokeStyle = '#333';
    base.context.lineWidth = 0.3;

    for (var y = base.GRID_SPACING; y < base.height; y += base.GRID_SPACING) {
      base.context.moveTo(0, y);
      base.context.lineTo(base.width, y);
    }

    for (var x = base.GRID_SPACING; x < base.width; x += base.GRID_SPACING) {
      base.context.moveTo(x, 0);
      base.context.lineTo(x, base.height);
    }
    base.context.stroke();
  }

  base.canvas.onmousedown = function (e) {
    base.startMouseTracking(e);
  };

  base.canvas.onmouseup = function (e) {
    base.canvas.onmousemove = null;
  };

  base.startMouseTracking = function (clickEvent) {
    base.canvas.onmousemove = function (e) {
      var ex = e.pageX - base.canvas.offsetLeft;
      var ey = e.pageY - base.canvas.offsetTop;

      var x = ex - (ex % base.GRID_SPACING);
      var y = ey - (ey % base.GRID_SPACING);

      base.cells.push(new base.Cell(x, y));
    };
  };

  base.Cell = function (x, y) {
    base.context.fillRect(x, y, base.GRID_SPACING, base.GRID_SPACING);

    var _neighbors = function () {
      var neighborSet = [];
      var dl = base.cells.length;

      for (var i = 0; i < dl; i++) {
        var cell = base.cells[i];

        if ((cell.x !== x && cell.y !== y) &&
            cell.x <= Math.abs(x - base.GRID_SPACING) &&
            cell.y <= Math.abs(y - base.GRID_SPACING)
           ) {
          var xdiff = Math.abs(x - base.GRID_SPACING);
          var ydiff = Math.abs(y - base.GRID_SPACING);
          console.log(xdiff);
          console.log(ydiff);
          neighborSet.push(cell);
        }
      }

      console.log(x);
      console.log(y);
      console.log(neighborSet);
      base.pause();
      return neighborSet;
    };

    var _die = function () {
      base.context.clearRect(x, y, base.GRID_SPACING, base.GRID_SPACING);
    };

    return {
      x: x,
      y: y,
      neighbors: _neighbors,
      die: _die
    };
  };

  base.breed = function () {

    // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    var garbage = [];
    var dl = base.cells.length;
    for (var i = 0; i < dl; i++) {
      var cell = base.cells[i];

      if (typeof(cell) === 'undefined') {
        // console.log(base.cells);
      } else {
        var neighborCount = cell.neighbors().length;
        if (neighborCount < 2 || neighborCount > 3) {
          var garbage_cell = base.cells.splice(i, 1);
          garbage.push(garbage_cell);
        }
      }
    }

    var gl = garbage.length;
    for (var x = 0; x < gl; x++) {
      garbage[x][0].die();
    }

    // Any live cell with two or three live neighbours lives on to the next generation.

    // Any live cell with more than three live neighbours dies, as if by overcrowding.

    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  };

  base.start = function () {
    base.breedInterval = setInterval(function () {
      base.breed();
    }, 1000);
  };

  base.pause = function () {
    clearInterval(base.breedInterval);
  };

  return {
    start: base.start,
    pause: base.pause,
    cells: base.cells
  };
};

var life;
window.onload = function () {
  var canvas = document.getElementById('game');
  life = new Life(canvas);
  life.start();
};
