import { useQuery } from "@tanstack/react-query";
import { Issue } from "../interfaces";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";


const getIssueInfo = async(issueNumber: number):Promise<Issue> => {
    //Simulamos una latencia de 2 segundos
    await sleep(2);
    const { data } = await githubApi.get<Issue>(`/issues/${ issueNumber }`);

    return data;


}

export const useIssue = ( issuesNumber : number) => {

    const issueQuery = useQuery(
        //Nombre de la cache
        ['issue', issuesNumber],
        () => getIssueInfo(issuesNumber),
    );

  return {
    issueQuery,
  };
}
