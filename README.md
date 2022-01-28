# How to run Testcafe tests
## Prequisites
* Node.js
* NPM
* Testcafe installed locally in 'STFU and click' folder - `npm install --save-dev testcafe`
* Clean app with no leaderboard (send DELETE on https://klikuj.herokuapp.com/api/v1/leaderboard before test run)
* [Testcafe Test Runner extension](https://marketplace.visualstudio.com/items?itemName=romanresh.testcafe-test-runner) (optional)
## Running the tests
* In 'STFU and click' folder terminal, run `testcafe chrome stfu_and_click.AT.ts` to run test in Google Chrome
* Or use Testcafe Runner extesion by right-clicking on test file and choosing one of the installed browser

# Notes
* The tests are written in a way that they fail on bugs i reported
* "Verify leaderboard shows updated score without long delay" was not automated because testcafe is not meant to be used for non functional tests
* i had to kind of frankenstain the selectors because i dont have access to the html and neither can talk to the developr to add some ids for me
