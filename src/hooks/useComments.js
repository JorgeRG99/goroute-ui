import { commentDelete, getLatestComment, getMoreComments, insertComment } from "../services/comment"
import { useUserSessionStore } from "../store/userSession"

export const useComments = () => {
    const authToken = useUserSessionStore(state => state.authToken)

    const getLastComment = async (postId) => {
        try {
            const res = await getLatestComment(authToken, postId)

            return res;
        } catch (error) {
            throw new Error(`Error insertando comentario ${error.message}`);
        }
    }

    const addComment = async (commentData) => {
        try {
            await insertComment(authToken, commentData)
        } catch (error) {
            throw new Error(`Error insertando comentario ${error.message}`);
        }
    }

    const moreComments = async (limit, postId) => {
        try {
            return await getMoreComments(authToken, postId, limit)
        } catch (error) {
            throw new Error(`Error obteniendo comentarios ${error.message}`);
        }
    }

    const deleteComment = async (commentId) => {
        try {
            return await commentDelete(authToken, commentId)
        } catch (error) {
            throw new Error(`Error obteniendo comentarios ${error.message}`);
        }
    }

    return { getLastComment, addComment, moreComments, deleteComment }
}
