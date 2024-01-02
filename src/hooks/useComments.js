import { getMoreComments, insertComment } from "../services/post"
import { useUserSessionStore } from "../store/userSession"

export const useComments = () => {
    const authToken = useUserSessionStore(state => state.authToken)

    const addComment = async (commentData) => {
        try {
            await insertComment(authToken, commentData)
        } catch (error) {
            throw new Error(`Error insertando comentario ${error.message}`);
        }
    }

    const moreComments = async (limit, post_id) => {
        try {
            return await getMoreComments(authToken, post_id, limit)
        } catch (error) {
            throw new Error(`Error obteniendo comentarios ${error.message}`);
        }
    }

    return { addComment, moreComments }
}
