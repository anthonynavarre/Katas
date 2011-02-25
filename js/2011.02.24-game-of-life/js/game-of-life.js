/*jslint plusplus: false */

var Life = function (canvas) {
  var base = this;

  base.GRID_VISIBLE = false;
  base.GRID_SPACING = 10;

  base.cells = [];
  base.garbage = [];
  base.canvas = canvas;
  base.context = canvas.getContext('2d');
  base.width = canvas.getAttribute('width');
  base.height = canvas.getAttribute('height');
  base.fillStyle = '#000';

  base.Cell = function (x, y) {

    var _living = false;

    // var _neighbors = function () {
      // var neighborSet = [];
      // var dl = base.cells.length;

      // for (var i = 0; i < dl; i++) {
        // var cell = base.cells[i];

        // if ((cell.x !== x && cell.y !== y) &&
            // Math.abs(cell.x - Math.abs(x - base.GRID_SPACING)) < base.GRID_SPACING &&
            // Math.abs(cell.y - Math.abs(y - base.GRID_SPACING)) < base.GRID_SPACING
           // ) {
          // neighborSet.push(cell);
        // }
      // }

      // // base.context.strokeStyle = '#f00';
      // // base.context.strokeRect(x, y, base.GRID_SPACING, base.GRID_SPACING);

      // // for (var n = 0; n < neighborSet.length; n++) {
        // // base.context.fillStyle = '#0f0';
        // // base.context.fillRect(neighborSet[n].x, neighborSet[n].y, base.GRID_SPACING, base.GRID_SPACING);
      // // }
      // // base.context.fillStyle = '#000';
      // // base.context.strokeStyle = '#000';

      // return neighborSet;
    // }();

    var _addNeighbor = function (neighbor) {
      if (typeof neighbor === 'undefined') return;
      this.neighbors.push(neighbor);
      neighbor.neighbors.push(this);
    };

    var _spawn = function () {
      this.living = true;
      base.context.fillRect(x, y, base.GRID_SPACING, base.GRID_SPACING);
    };

    var _die = function () {
      this.living = false;
      base.context.clearRect(x, y, base.GRID_SPACING, base.GRID_SPACING);
    };

    return {
      x: x,
      y: y,
      die: _die,
      spawn: _spawn,
      living: _living,
      neighbors: [],
      addNeighbor: _addNeighbor
    };
  };

  // TODO: Make this more robust with some math voodoo instead of loop
  base.cellAt = function (x, y) {
    var dl = base.cells.length;
    for (var i = 0; i < dl; i++) {
      var cell = base.cells[i];
      if (cell.x === x && cell.y === y) {
        return cell;
      }
    }
  };

  // set up grid
  base.context.strokeStyle = '#333';
  base.context.lineWidth = 0.3;

  var i = 0;
  for (var y = base.GRID_SPACING; y < base.height; y += base.GRID_SPACING) {
    // if (base.GRID_VISIBLE) {
      // base.context.moveTo(0, y);
      // base.context.lineTo(base.width, y);
    // }

    for (var x = base.GRID_SPACING; x < base.width; x += base.GRID_SPACING) {
      var cell = new base.Cell(x, y);
          cell.addNeighbor( base.cells[i - 1] );
          cell.addNeighbor( base.cellAt(x - base.GRID_SPACING, y - base.GRID_SPACING) );
          cell.addNeighbor( base.cellAt(x, y - base.GRID_SPACING) );
          cell.addNeighbor( base.cellAt(x + base.GRID_SPACING, y - base.GRID_SPACING) );
      base.cells.push(cell);
      i++;
    }
  }

  // for (var x = base.GRID_SPACING; x < base.width; x += base.GRID_SPACING) {
    // if (base.GRID_VISIBLE) {
      // base.context.moveTo(x, 0);
      // base.context.lineTo(x, base.height);
    // }
  // }
  // base.context.stroke();

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

      var alreadyPopulated = false;
      var dl = base.cells.length;
      for (var i = 0; i < dl; i++) {
        var cell = base.cells[i];
        alreadyPopulated = (cell.x === x && cell.y === y && cell.living);
        if (alreadyPopulated) {
          break;
        }
      }

      if (!alreadyPopulated) {
        base.cellAt(x, y).spawn();
      }
    };
  };

  base.breed = function () {

    // TODO: Figure out why some cells live longer than they should

    var garbage = [];
    var dl = base.cells.length;
    for (var i = 0; i < dl; i++) {
      var cell = base.cells[i];

      if (typeof(cell) === 'undefined') {
        // TODO: Figure out why this is needed
      } else {
        var neighbors = cell.neighbors;

        var livingCount = 0;
        for (var x = 0; x < neighbors.length; x++) {
          if (neighbors[x].living) {
            livingCount++;
          }
        }

        if ( (livingCount < 2 || livingCount > 3) && cell.living ) {
          base.garbage.push(cell);
        } else if (livingCount === 3 && !cell.living) {
          cell.spawn();
        }
      }
    }

    base.collectGarbage();
  };

  base.collectGarbage = function () {
    var gl = base.garbage.length;
    for (var x = 0; x < gl; x++) {
      base.garbage[x].die();
    }
    base.garbage = [];
  };

  // THE RULES:
  // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overcrowding.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  base.start = function () {
    base.breedInterval = setInterval(function () {
      base.breed();
    }, 2000);
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

