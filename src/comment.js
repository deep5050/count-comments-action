const core = require("@actions/core");

module.exports.send = async (context, github_token, thread_number, message) => {
  core.log(`initiating comment process`);

  const author = context.payload.sender.login;
  const repo_owner = context.payload.repository.owner.login;
  if (author.includes("[bot]") || author === repo_owner) {
    console.warning("Avoiding PR opened by bot/repo owner....");
    process.exit(0);
  }

  const octokit = github.getOctokit(github_token);
  try {
    const comment = await octokit.issues.createComment({
      issue_number: thread_number,
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      body: message,
    });

    core.log(`Successfully commented on the target issue`);
    core.setOutput("comment-url", comment.data.html_url);
  } catch (error) {
    core.setFailed(`Error in commenting the report: ${error.message}`);
  }
};
