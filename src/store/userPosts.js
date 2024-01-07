import { create } from "zustand";
import { getFromStorage } from "../services/storage";
import { createPost, deletePost, getYourPosts, updatePost } from "../services/post";
import { isNumber } from "../services/helpers";

export const useUserPostsStore = create((set) => {

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
            try {
                const response = await createPost(postData, authToken)

                if(isNumber(response)) return response

                setYourPosts()
            } catch (error) {
                throw new Error(`Error añadiendo publicacion ${error.message}`);
            }
        },

        editPost: async (updatedPostData) => {
            try {
                const response = await updatePost(authToken, updatedPostData)

                if(isNumber(response)) return response

                setYourPosts()
            } catch (error) {
                throw new Error(`Error añadiendo actividad ${error.message}`);
            }
        },

        deletePost: async (postId) => {
            try {
                const response = await deletePost(authToken, postId)

                setYourPosts()

                return response
            } catch (error) {
                throw new Error(`Error añadiendo actividad ${error.message}`);
            }
        },

        setUserPosts: async () => {
            const authToken = getFromStorage('AuthToken') || null;
            const fetchedPosts = await getYourPosts(authToken)

            set({ yourPosts: fetchedPosts })

        },

        cleanPosts: () => set({ yourPosts: null }),
    }
})