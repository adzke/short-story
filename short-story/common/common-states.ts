import { makeVar } from "@apollo/client";
import { Story } from "./common-types";



export const rvStories = makeVar<Story[]>([])
export const rvCurrentStory = makeVar<Story | undefined>(undefined)
