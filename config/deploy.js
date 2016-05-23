/* jshint node: true */

module.exports = function(deployTarget) {
  return {
    ghpages: {
      gitRemoteUrl: `https://${process.env.GITHUB_TOKEN}@github.com/rmachielse/ember-data-paperclip.git`
    }
  };
};
