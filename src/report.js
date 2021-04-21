const core = require("@actions/core");

module.exports.parse = function () {
  var report_text = "";

  /* This expects a file named `report.md` on the root and the parse
  the file to generate tex for the comment */

  try {
    report_text = fs.readFileSync("report.md", "utf-8");
  } catch (error) {
    core.setFailed(`Error in reading the file: ${error.message}`);
  }

  var lines = report_text.split("\n");
  lines.splice(0, 3);
  report_text = lines.join("\n");

  const fixed_footer = `
Horribly commented code averages 0-5% comment ratio.
Poorly commented code has a 5-10% comment ratio.
Average code has a 10-15% comment ratio.
Good code has a 15-25% comment ratio.
Excellent code has a > 25% comment ratio.
Use [this action](https://github.com/deep5050/count-comments-action) on your projects to generate a report like this.`;

  var modified_data = `#### comment-to-code-ratio analysis report for the last push :tada:
    
${report_text}
${fixed_footer}`;

  return modified_data;

  //   try {
  //     fs.writeFileSync("report.md", modified_data, "utf-8");
  //   } catch (error) {
  //     core.setFailed(`Error in writing the file: ${error.message}`);
  //   }
};
