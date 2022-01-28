import { Selector } from 'testcafe';

export class STFUAndClickPageObject {
    appURL = 'https://test-stfu-applifting.herokuapp.com/';

    // Common Selectors
    clickButton = Selector('button');
    tableRow = Selector('tbody>tr');
    tableColumnNumber = Selector('tbody>tr td').nth(0);
    tableColumnName = Selector('tbody>tr td').nth(1);
    tableColumnScore = Selector('tbody>tr td').nth(2);

    // Landing page Selectors
    teamNameInput = Selector('#name');
    warningMessage = Selector('form+div');
    headerSection = Selector('header');

    // Team page Selectors
    teamNameHeader = Selector('h2>b');
    teamClicksHeader = Selector('h3+p');

    testData = {
        inputs: {
            teamName0: 'firstAndBestTeam',
            forbiddenCharactersName: 'ßïĝ ŜŦŗīñĝ',
            teamName1: 'clickerTeam',
            teamName2: 'enterTeam'
        },
        text: {
            correctWarningMessage: 'Team name cannot contain spaces, diacritics or special characters',
        },
        styles: {
            blue: 'rgb(70, 142, 229)',
            "light blue": 'rgb(219, 233, 250)',
            "lightest blue": 'rgb(236, 243, 252)',
            leftAlign: 'left',
            rightAlign: 'right'
        }
    }
};