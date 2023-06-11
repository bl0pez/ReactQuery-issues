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

//Añadir los comentarios
const getIssueComments = async(issueNumber: number):Promise<Issue[]> => {
    //Simulamos una latencia de 2 segundos
    await sleep(2);
    const { data } = await githubApi.get<Issue[]>(`/issues/${ issueNumber }/comments`);
    return data;
}

export const useIssue = ( issueNumber : number) => {

    const issueQuery = useQuery(
        //Nombre de la cache
        ['issue', issueNumber],
        () => getIssueInfo(issueNumber),
    );

    const commentsQuery = useQuery(
        ['issue', issueNumber, 'comments' ],
        () => getIssueComments( issueQuery.data!.number ),
        {
            enabled: issueQuery.data !== undefined,
        }
    );

  return {
    issueQuery,
    commentsQuery
  };
}
