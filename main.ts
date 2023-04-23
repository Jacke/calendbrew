#!/usr/bin/env node
import trelloService from "./src/api/trello/trello";
import GCalendar from "./src/api/gcal/gcalendar.js";
import configLoader from "./src/config/loader.js";

import blessed from "blessed";
import fs from "fs";
import art from "ascii-art";

import chalk from "chalk";
import { config } from 'dotenv';
import { ls } from './src/utils/shell.js';

console.log(config());

import { Command } from "commander";
import whoami from "whoami";
//const { Command } = require("commander");
//var whoami = require("whoami");
const logo = () => {
  (async () => {
    try {
      Promise.all([art.font("Calend", "doom"), art.font("Brew", "doom")]).then(
        (values) => {
          let calend = values[0].split("\n");
          let brew = values[1].split("\n");
          var res = [];
          var line;
          for (line in calend) {
            res.push(
              chalk.red(calend[line]) + " " + chalk.hex("#964B00")(brew[line])
            );
          }
          console.log(res.join("\r\n"));
        }
      );
    } catch (err) {
      console.error("Error", err);
    }
  })();
};

const program = new Command();
program
  .option("-i, --init", "Initialize config file Planner.json for " + whoami)
  .option("-s, --stat", "Statistics");
program.parse();
const options = program.opts();

var configAttributes = null;

const feedBackLogic = () => {
  console.log("How it was?");
  console.log("Task 1/n");
  console.log("Options:");
  console.log("Fully ready");
  console.log("Ready with hard");
  console.log("Guys, I need more time.");
  console.log("Ignored because of other work");
  console.log("Ignored because senseless");
};

const selectTasks = () => {
  console.log("Tasks from Trello, labels ..., ...., ..., state ....");
  console.log("Options: Do now, do next, schedule, avoid");
  console.log("Submit");
};

const estimateTasks = () => {
  console.log(
    "Estimate tasks (select hrs as n hrs, m mnts) or (skip by empty field)"
  );
  console.log("Task 1-2 hrs.....");
  console.log("Submit");
};

const publishTasks = () => {
  console.log("API call, are you sure???, redirect to selectTasks()");
  console.log(
    "Execute API call, show progress bar and wait for results to show them"
  );
};

const brewLogic = () => {
  // Feedback about last one -- How it was?
  feedBackLogic();
  // Select current one
  selectTasks();
  // Add optional estimates
  estimateTasks();
  // **Add projects for Timing App**
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

console.log("Options, ", options, Object.values(options).length);
if (Object.values(options).length == 0) {
  if (configAttributes == null) {
    logo();
    console.log("red", "Start with --init option");
  } else {
    // Run program :
    logo();
    brewLogic();
  }
}

if (options.length == 1 && options.stat) {
  const allFeedbacksParsed = false;

  if (allFeedbacksParsed) {
    var Pie = require("cli-pie");

    // Generate a new pie, with radius 5 characters
    var p = new Pie(
      5,
      [
        { label: "Water", value: 70, color: [0, 0, 255] },
        { label: "Land", value: 30, color: [255, 240, 0] },
      ],
      {
        legend: true,
      }
    );

    // Stringify
    console.log(p.toString());

    console.log(
      "Feedback graphs and statistics for each tasks on week, exported as HTML!"
    );
  } else {
    feedBackLogic();
  }
}
// console.log('trelloService launch: ', trelloService());
console.log("gcal run", GCalendar());

configLoader("./config/planner.json");
console.log('ls', ls());
