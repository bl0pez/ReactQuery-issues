import axios from 'axios';

// https://api.github.com/repos/facebook/react/labels

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        //Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_TOKEN}`
    }
});