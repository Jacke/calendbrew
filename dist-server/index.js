#!/usr/bin/env node
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var blessed = require('blessed');

var fs = require('fs');

var art = require('ascii-art');

var chalk = require('chalk');

require('dotenv').config();

var trelloService = require('../trello.js');

var _require = require('commander'),
    Command = _require.Command;

var whoami = require('whoami');

var logo = function logo() {
  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              Promise.all([art.font("Calend", 'doom'), art.font("Brew", 'doom')]).then(function (values) {
                var calend = values[0].split('\n');
                var brew = values[1].split('\n');
                var res = [];

                for (line in calend) {
                  res.push(chalk.red(calend[line]) + " " + chalk.hex('#964B00')(brew[line]));
                }

                console.log(res.join("\r\n"));
              });
            } catch (err) {
              console.error('Error', err);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))();
};

var program = new Command();
program.option('-i, --init', 'Initialize config file Planner.json for ' + whoami).option('-s, --stat', 'Statistics');
program.parse();
var options = program.opts();
var config = null;

var feedBackLogic = function feedBackLogic() {
  console.log('How it was?');
  console.log('Task 1/n');
  console.log('Options:');
  console.log('Fully ready');
  console.log('Ready with hard');
  console.log('Guys, I need more time.');
  console.log('Ignored because of other work');
  console.log('Ignored because senseless');
};

var selectTasks = function selectTasks() {
  console.log('Tasks from Trello, labels ..., ...., ..., state ....');
  console.log('Options: Do now, do next, schedule, avoid');
  console.log('Submit');
};

var estimateTasks = function estimateTasks() {
  console.log('Estimate tasks (select hrs as n hrs, m mnts) or (skip by empty field)');
  console.log('Task 1-2 hrs.....');
  console.log('Submit');
};

var publishTasks = function publishTasks() {
  console.log('API call, are you sure???, redirect to selectTasks()');
  console.log('Execute API call, show progress bar and wait for results to show them');
};

var brewLogic = function brewLogic() {
  // Feedback about last one -- How it was?
  feedBackLogic(); // Select current one

  selectTaks(); // Add optional estimates

  estimateTasks(); // **Add projects for Timing App**
  // Publish to calendar

  publishTasks();
  /*
  // Create a screen object.
  var screen = blessed.screen({
    smartCSR: true
  });
  
  screen.title = 'my window title';
  
  // Create a box perfectly centered horizontally and vertically.
  var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    content: 'Hello {bold}world{/bold}!',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'magenta',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  });
  
  // Append our box to the screen.
  screen.append(box);
  
  // Add a png icon to the box
  var icon = blessed.image({
    parent: box,
    top: 0,
    left: 0,
    type: 'overlay',
    width: 'shrink',
    height: 'shrink',
    file: __dirname + '/my-program-icon.png',
    search: false
  });
  
  // If our box is clicked, change the content.
  box.on('click', function(data) {
    box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
    //screen.render();
  });
  
  // If box is focused, handle `enter`/`return` and give us some more content.
  box.key('enter', function(ch, key) {
    box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
    box.setLine(1, 'bar');
    box.insertLine(1, 'foo');
    //screen.render();
  });
  
  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  
  // Focus our element.
  box.focus();
  
  // Render the screen.
   screen.render();
  */

  /*
  fs.readFile('logo.ascii', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('\x1b[31m', data)
  })
  */
};

console.log('Options, ', options, Object.values(options).length);

if (Object.values(options).length == 0) {
  if (config == null) {
    logo();
    console.log('red', 'Start with --init option');
  } else {
    // Run program :
    logo();
    brewLogic();
  }
}

if (options.length == 1 && options.stat) {
  if (allFeedbacksParsed) {
    var Pie = require("cli-pie"); // Generate a new pie, with radius 5 characters


    var p = new Pie(5, [{
      label: "Water",
      value: 70,
      color: [0, 0, 255]
    }, {
      label: "Land",
      value: 30,
      color: [255, 240, 0]
    }], {
      legend: true
    }); // Stringify

    console.log(p.toString());
    console.log('Feedback graphs and statistics for each tasks on week, exported as HTML!');
  } else {
    feedBackLogic();
  }
}

console.log('trelloService', trelloService);