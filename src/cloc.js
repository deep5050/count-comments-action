const core = require("@actions/core");
const github = require("@actions/github");
const execa = require("execa");
const fs = require("fs");

module.exports.run_command = function (options) {
  core.info(`initiating cloc command`);

  const options_array = options.split(" ");
  try {
    execa.sync("cloc", options_array);
  } catch (error) {
    core.setFailed(`Error in running the command: ${error.message}`);
  }
};
