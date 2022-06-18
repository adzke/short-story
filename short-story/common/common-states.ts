import { makeVar } from "@apollo/client";
import { BannerProps } from "./alert-banner";
import { Story } from "./common-types";



export const rvStories = makeVar<Story[]>([])
export const rvCurrentStory = makeVar<Story | undefined>(undefined)
export const rvShowBanner = makeVar<BannerProps | undefined>(undefined)
export const rvShowSearchBar = makeVar<boolean>(false)