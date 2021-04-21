const core = require("@actions/core");
const github = require("@actions/github");
const execa = require("execa");
const fs = require("fs");

const cloc = require("./src/cloc");
const comment = require("./src/comment");
const report = require("./src/report");

const start = async () => {
  const github_token = core.getInput("GITHUB_TOKEN", { required: true });
  const options = core.getInput("options", { required: true });
  const context = github.context;
  const event = context.eventName;

  /* run the cloc command against the codebase , action checkout is needed */
  cloc.run_command(options);

  /* getting the data to be commented on the thread */
  const report_data = report.parse();

  /* getting the thread number, pr and pr_target only, avoiding issues */
  if (event === "pull_request" || event === "pull_request_target") {
    const thread_number = context.payload.pull_request.number;
    await comment.send(context, github_token, thread_number, report_data);
  }
};

start()
  .then(() => {
    core.info("successfully completed the workflow");
  })
  .catch((err) => {
    core.error("Error : ${err}");
  });