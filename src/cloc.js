const core = require("@actions/core");

module.exports.run_command = function (options) {
  core.info(`initiating cloc command`);

  const options_array = options.split(" ");
  try {
    execa.sync("cloc", options_array);
  } catch (error) {
    core.setFailed(`Error in running the command: ${error.message}`);
  }
};
