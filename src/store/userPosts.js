import { create } from "zustand";
import { getFromStorage } from "../services/storage";
import { createPost, getYourPosts } from "../services/post";

export const useUserPostsStore = create((set, get) => {

    const authToken = getFromStorage('AuthToken') || null;

    const setYourPosts = async () => {
        if (authToken) {
            const fetchedPosts = await getYourPosts(authToken)

            set({ yourPosts: fetchedPosts })
        }
    }

    setYourPosts()

    return {
        yourPosts: null,

        addPost: async (postData) => {
            const { yourPosts } = get()

            try {
                const response = await createPost(postData, authToken)

                postData.likes = []
                const udpatedUserPosts = [...yourPosts]
                udpatedUserPosts.push(postData)

                set({ yourPosts: udpatedUserPosts })

                return response
            } catch (error) {
                throw new Error(`Error añadiendo publicacion ${error.message}`);
            }
        },

        cleanPosts: () => set({ yourPosts: null }),
    }
})