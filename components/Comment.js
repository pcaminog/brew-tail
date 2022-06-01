import CommentForm from "./CommentForm";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import supabase from "../utils/supabase";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const canReply = Boolean(currentUserId);

  const replyId = parentId ? parentId : comment.id;
  const createdAt = timeAgo.format(new Date(comment.createdAt));
  return (
    <div key={comment.id}>
      <div 
      className=""
      >
        <div className="flex items-center text-ter">
          <div>{comment.user} || {createdAt}</div>
        </div>
        <div className="boder-2 border-gray-200 p-2">{comment.comment}</div>

        <div>
          {canReply && (
            <div
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
