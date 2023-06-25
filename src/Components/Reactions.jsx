import { useDispatch } from "react-redux";
import { addReaction } from "../redux/slice/postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  cool: "😎",
  wow: " 😮 ",
  funny: "😂",
  love: "❤️",
};

const Reactions = ({ post }) => {
  const dispatch = useDispatch();

  const handleReactionClick = (postId, reaction) => {
    dispatch(addReaction({ postId, reaction }));
  };
  return (
    <div>
      {Object.keys(reactionEmoji).map((reaction) => (
        <button
          className="mx-1"
          key={reaction}
          onClick={() => handleReactionClick(post.id, reaction)}
        >
          {reactionEmoji[reaction]} {post.reactions[reaction]}
        </button>
      ))}
    </div>
  );
};

export default Reactions;
