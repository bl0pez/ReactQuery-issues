import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Label } from '../interfaces/label';
import { sleep } from '../../helpers/sleep';

const getLabels = async (): Promise<Label[]> => {
    await sleep(2);
    const { data } = await githubApi.get<Label[]>('/labels');
    return data;
}


export const useLabels = () => {
    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            //La data se mantiene fresca por 1 hora
            // staleTime: 1000 * 60 * 60,
            // Pormientra se hace la petición, muestra esta data
            placeholderData: [{
                id: 725156255,
                node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
                url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
                name: "good first issue (taken)",
                color: "b60205",
                default: false,
            }],
        }
    );

    return labelsQuery;

}
