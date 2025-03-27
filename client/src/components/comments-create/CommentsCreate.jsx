import { useParams } from "react-router";
import { useComments, useCreateComment } from "../../api/commentsApi";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function CommentsCreate({
    setComments
}) {
    const { gameId } = useParams();
    const { email } = useContext(UserContext);
    const { create } = useCreateComment();

    const createCommentAction = async (formData) => {
        const { comment } = Object.fromEntries(formData);
        const newComment = await create(comment, gameId, email);

        setComments(comments => [...comments, newComment]);
    }

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={createCommentAction}>
                <textarea
                    name="comment"
                    placeholder="Comment......"
                    defaultValue={""}
                />
                <input
                    className="btn submit"
                    type="submit"
                    defaultValue="Add Comment"
                />
            </form>
        </article>
    );
}