import { t, ClientFunction } from 'testcafe';
import { STFUAndClickPageObject } from './stfu_and_click.PO';
import { STFUAndClickHelper } from './stfu_and_click.helper';

const stfuPO = new STFUAndClickPageObject;

fixture`All "STFU AND CLICK" app tests`
    .page(stfuPO.appURL)
    .beforeEach(async () => {
        await t
            .maximizeWindow();
    });
test.meta('e2e', 'functional')('Verify it is possible to add new team', async () => {
    // Add new team
    await t
        .typeText(stfuPO.teamNameInput, stfuPO.testData.inputs.teamName0)
        .click(stfuPO.clickButton);

    // Verify new team has been created
    const currentURL = ClientFunction(() => document.location.href);
    const headerTeamName = stfuPO.teamNameHeader.innerText;

    await t
        .expect(currentURL()).eql(stfuPO.appURL + stfuPO.testData.inputs.teamName0)
        .expect(headerTeamName).eql(stfuPO.testData.inputs.teamName0);
});
test.meta('e2e', 'functional')('Verify app displays correct warning after adding team name with forbidden characters', async () => {
    // Try to add team with forbidden characters
    await t
        .typeText(stfuPO.teamNameInput, stfuPO.testData.inputs.forbiddenCharactersName)
        .click(stfuPO.clickButton);

    // Verify correct warning is displayed
    const warningMessageVisibility = await stfuPO.warningMessage.visible;
    const warningMessageText = stfuPO.warningMessage.innerText;

    await t
        .expect(warningMessageVisibility).ok()
        // BUG: STFUAC-002
        .expect(warningMessageText).eql(stfuPO.testData.text.correctWarningMessage);
});
test.meta('e2e', 'functional')('Verify you cannot add team with forbidden characters using team name input field', async () => {
    // Try to add team with forbidden characters
    await t
        .typeText(stfuPO.teamNameInput, stfuPO.testData.inputs.forbiddenCharactersName)
        .click(stfuPO.clickButton);

    // Verify you weren't redirected to the team's page
    const currentURL = ClientFunction(() => document.location.href);

    await t.expect(currentURL()).notEql(stfuPO.appURL + stfuPO.testData.inputs.forbiddenCharactersName);
});
test.meta('e2e', 'functional')('Verify you cannot add team with forbidden characters using url', async () => {
    // Try to add team with forbidden characters by redirecting to that teams page
    await t
        .navigateTo(stfuPO.appURL + stfuPO.testData.inputs.forbiddenCharactersName)
        .eval(() => location.reload());

    // Verify you weren't redirected to the team's page
    const currentURL = ClientFunction(() => document.location.href);
    const headerTeamName = stfuPO.teamNameHeader.innerText;

    // BUG: STFUAC-003
    await t
        .expect(currentURL()).notEql(stfuPO.appURL + stfuPO.testData.inputs.forbiddenCharactersName) // this should fail :/
        .expect(headerTeamName).notEql(stfuPO.testData.inputs.forbiddenCharactersName);
});
test.meta('e2e', 'functional')('Verify accurate number of clicks is recorded when using click button', async () => {
    // Add new team using "Click!" button
    await t
        .typeText(stfuPO.teamNameInput, stfuPO.testData.inputs.teamName1)
        .click(stfuPO.clickButton)
        .wait(1000);

    // Verify number of clicks is 1
    let headerClicks = Number(await stfuPO.teamClicksHeader.innerText);
    let leaderboardClicks = await STFUAndClickHelper.getLeaderBoardTeamClicks(stfuPO.testData.inputs.teamName1);

    await t
        .expect(headerClicks).eql(1)
        .expect(leaderboardClicks).eql(headerClicks);

    // Add 4 more clicks
    for (let i = 0; i < 4; i++) {
        await t
            .click(stfuPO.clickButton)
            .wait(300);
    }

    // Verify number of clicks is 5
    headerClicks = Number(await stfuPO.teamClicksHeader.innerText);
    leaderboardClicks = await STFUAndClickHelper.getLeaderBoardTeamClicks(stfuPO.testData.inputs.teamName1);

    await t
        .expect(headerClicks).eql(5)
        .expect(leaderboardClicks).eql(headerClicks);
});
test.meta('e2e', 'functional')('Verify accurate number of clicks is recorded when using enter', async () => {
    // Add new team using enter
    await t
        .typeText(stfuPO.teamNameInput, stfuPO.testData.inputs.teamName2)
        .pressKey('enter')
        .wait(1000);

    // Verify number of clicks is 0
    let headerClicks = Number(await stfuPO.teamClicksHeader.innerText);
    let leaderboardClicks = await STFUAndClickHelper.getLeaderBoardTeamClicks(stfuPO.testData.inputs.teamName2);

    // BUG: STFUAC-009
    await t
        .expect(headerClicks).eql(0)
        .expect(leaderboardClicks).eql(headerClicks);
});
test.meta('e2e', 'visual')('Verify style of the page', async () => {
    const headerBackgroundColor = stfuPO.headerSection.getStyleProperty('background-color');
    const buttonBackgroundColor = stfuPO.clickButton.getStyleProperty('background-color');
    const oddRowBackgroundColor = stfuPO.tableRow.nth(0).getStyleProperty('background-color');
    const evenRowBackgroundColor = stfuPO.tableRow.nth(1).getStyleProperty('background-color');
    const numberColumn = stfuPO.tableColumnNumber.getStyleProperty('text-align');
    const nameColumn = stfuPO.tableColumnName.getStyleProperty('text-align');
    const scoreColumn = stfuPO.tableColumnScore.getStyleProperty('text-align');

    await t
        .expect(headerBackgroundColor).eql(stfuPO.testData.styles.blue)
        .expect(buttonBackgroundColor).eql(stfuPO.testData.styles.blue)
        .expect(oddRowBackgroundColor).eql(stfuPO.testData.styles['light blue'])
        .expect(evenRowBackgroundColor).eql(stfuPO.testData.styles['lightest blue'])
        // BUG: STFUAC-004
        .expect(numberColumn).eql(stfuPO.testData.styles.leftAlign)
        .expect(nameColumn).eql(stfuPO.testData.styles.leftAlign)
        .expect(scoreColumn).eql(stfuPO.testData.styles.rightAlign);
});