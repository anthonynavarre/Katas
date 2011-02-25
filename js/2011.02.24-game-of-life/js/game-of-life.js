/*jslint plusplus: false */

/*
 * Conway's Game of Life
 * 
 * http://en.wikipedia.org/wiki/Conway's_Game_of_Life
 * 
 * THE RULES:
 * Any live cell with fewer than two live neighbours dies, as if caused by under-population.
 * Any live cell with two or three live neighbours lives on to the next generation.
 * Any live cell with more than three live neighbours dies, as if by overcrowding.
 * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 * 
 */

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
  base.cellsPerRow = Math.floor(base.width / base.GRID_SPACING);
  base.cellsPerCol = Math.floor(base.height / base.GRID_SPACING);
  base.fillStyle = '#000';

  // TODO: Move this off into its own file
  // Profiling & Logging w/ Firebug, etc.
  base.console = console;

  base.log = function (msg) {
    if (typeof base.console === 'undefined') {
      return;
    }

    base.console.log(msg);
  };

  base.profile = function (title, callback) {
    if (typeof(callback) !== 'function' ||
        typeof(base.console) === 'undefined' ||
        typeof(base.console.profile) === 'undefined') {
      return;
    }

    base.console.profile(title);
    callback();
    base.console.profileEnd();
  };

  base.Cell = function (x, y) {

    var _neighbors = [];
    var _living = false;

    var _addNeighbor = function (neighbor) {
      if (typeof neighbor === 'undefined') {
        return;
      }
      _neighbors.push(neighbor);
    };

    var _setNeighbors = function () {
      var x = this.x;
      var y = this.y;
      var lx = this.x - base.GRID_SPACING;
      var up = this.y - base.GRID_SPACING;
      var rx = this.x + base.GRID_SPACING;
      var dn = this.y + base.GRID_SPACING;
      _addNeighbor(base.cellAt(lx, up));
      _addNeighbor(base.cellAt(x, up));
      _addNeighbor(base.cellAt(rx, up));
      _addNeighbor(base.cellAt(lx, y));
      _addNeighbor(base.cellAt(rx, y));
      _addNeighbor(base.cellAt(lx, dn));
      _addNeighbor(base.cellAt(x, dn));
      _addNeighbor(base.cellAt(rx, dn));
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
      neighbors: _neighbors,
      setNeighbors: _setNeighbors
    };
  };

  base.cellAt = function (x, y) {
    var index = ((y - 1) * base.cellsPerRow) + x;
    return base.cells[index];
  };

  // set up grid
  base.context.strokeStyle = '#333';
  base.context.lineWidth = 0.3;

  var i = 0;
  for (var y = 0; y < base.height; y += base.GRID_SPACING) {
    // if (base.GRID_VISIBLE) {
      // base.context.moveTo(0, y);
      // base.context.lineTo(base.width, y);
    // }

    for (var x = 0; x < base.width; x += base.GRID_SPACING) {
      var cell = new base.Cell(x, y);
      base.cells.push(cell);
    }
  }

  for (var n = 0; n < base.cells.length; n++) {
    base.cells[n].setNeighbors();
    break;
  }

  base.eventPos = function (e) {
    var ex = e.pageX - base.canvas.offsetLeft;
    var ey = e.pageY - base.canvas.offsetTop;

    var x = ex - (ex % base.GRID_SPACING);
    var y = ey - (ey % base.GRID_SPACING);

    return {
      x: x,
      y: y
    };
  };

  base.spawnForEvent = function (e) {
    var pos = base.eventPos(e);
    var cell = base.cellAt(pos.x, pos.y);
    if (typeof(cell) === 'undefined' || cell.living) {
      return;
    }

    base.cellAt(pos.x, pos.y).spawn();
  };

  base.canvas.onmousedown = function (e) {
    base.startMouseTracking(e);
  };

  base.canvas.onmouseup = function (e) {
    base.canvas.onmousemove = null;
  };

  base.startMouseTracking = function (clickEvent) {
    base.canvas.onmousemove = function (e) {
      base.spawnForEvent(e);
    };
  };

  base.canvas.onclick = function (e) {
    base.spawnForEvent(e);
  };

  base.breed = function () {

    var garbage = [];
    var spawnPool = [];
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

        if ((livingCount < 2 || livingCount > 3) && cell.living) {
          base.garbage.push(cell);
        } else if (livingCount === 3 && !cell.living) {
          spawnPool.push(cell);
        }
      }
    }

    for (var n = 0; n < spawnPool.length; n++) {
      spawnPool[n].spawn();
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

  base.start = function () {
    base.breedInterval = setInterval(function () {
      base.breed();
    }, 500);
  };

  base.pause = function () {
    clearInterval(base.breedInterval);
  };

  // Wire up interface elements
  // TODO: Split this into separate class?
  // TODO: More Interface features (eg: speed control, grid spacing)
  document.getElementById('start').onclick = function () {
    base.start();
  };

  document.getElementById('pause').onclick = function () {
    base.pause();
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
};

