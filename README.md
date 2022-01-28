# How to run Testcafe tests
## Prequisites
* Node.js installed
* NPM installed
* Testcafe installed locally in 'STFU and click' folder - `npm install --save-dev testcafe`
* Clean app with no leaderboard (send DELETE on https://klikuj.herokuapp.com/api/v1/leaderboard before test run)
* [Testcafe Test Runner extension](https://marketplace.visualstudio.com/items?itemName=romanresh.testcafe-test-runner) (optional)
## Running the tests
* In 'STFU and click' folder terminal, run `testcafe chrome stfu_and_click.AT.ts` to run test in Google Chrome
* Or use Testcafe Runner extesion by right-clicking on test file and choosing one of the installed browsers

# Notes
* The tests are written according to test cases from [the task solution](https://docs.google.com/document/d/1f8dkwbWBX02RjssqSAzV87dvVrlBZAk3lQ0DNUTyTRw/edit?usp=sharing).
* The tests are written in a way that they fail on bugs I reported.
* "Verify leaderboard shows updated score without long delay" was not automated because testcafe is not meant to be used for non functional tests.
* Not all tests from the task were automated because of the lack of time.
