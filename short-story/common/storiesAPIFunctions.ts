import { rvIsLoading } from "../components/loading";
import { rvStories } from "./common-states";
import { Story } from "./common-types";

const apiUrl = 'https://adzke.pythonanywhere.com/stories/'



export const getStories = async () => {
    try {
        rvIsLoading(true)
        // 👇️ const response: Response
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        // 👇️ const result: GetUsersResponse
        const result = (await response.json()) as Story[];
        console.log(result)
        rvStories(result)
        rvIsLoading(false)

    }
    catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            rvIsLoading(false)
            return error.message;
        } else {
            rvIsLoading(false)
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }

}
