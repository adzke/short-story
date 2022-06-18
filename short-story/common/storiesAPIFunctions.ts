import { rvIsLoading } from "../components/loading";
import { BannerColours } from "./alert-banner";
import { rvShowBanner, rvStories } from "./common-states";
import { PostStoryResult, Story, StoryPost } from "./common-types";

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

export const postStories = async (story: StoryPost) => {

    try {
        rvIsLoading(true)
        // 👇️ const response: Response
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(story),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        // 👇️ const result: CreateUserResponse
        const result = (await response.json()) as PostStoryResult;

        console.log('result is: ', JSON.stringify(result, null, 4));
        getStories()
        rvIsLoading(false)
        rvShowBanner({
            message: "Post successful",
            colour: BannerColours.appleGreen
        })
        return {
            story: result,
            postSucessful: true,
            errorMessage: 'Post sucessful, no error.'
        }
    }
    catch (error) {
        if (error instanceof Error) {
            rvShowBanner({
                message: error.message,
                colour: BannerColours.appleRed
            })
            console.log('error message: ', error.message);
            rvIsLoading(false)
            return {
                errorMessage: error.message,
                postSucessful: false
            }

        } else {
            rvShowBanner({
                message: 'unexpected error: ',
                colour: BannerColours.appleRed
            })
            console.log('unexpected error: ', error);
            rvIsLoading(false)
            return {
                errorMessage: 'An unexpected error occurred',
                postSucessful: false
            }

        }


    }

}
