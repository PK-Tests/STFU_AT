import { Selector } from 'testcafe';

export class STFUAndClickHelper {
    /**
     * Gets score of chosen team displayed in the leaderboard
     * @param teamName String name of the team
     * @returns Number score of the given team
     */
    static async getLeaderBoardTeamClicks(teamName: string): Promise<number> {
        const teamScore = Selector('td').withExactText(teamName).nextSibling(0).innerText;
        return Number(await teamScore);
    }
};
