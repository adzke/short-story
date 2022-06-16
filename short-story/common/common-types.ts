export type Story = {
    id: number;
    title: string
    story: string;
    author: string;
    publish_date: string
};

export type PostStoryResult = {
    story: Story
    postSucessful: boolean
    errorMessage: Error
}

export type StoryPost = {
    title: string,
    author: string,
    story: string
}