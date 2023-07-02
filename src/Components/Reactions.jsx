import { useDispatch } from "react-redux";
import {
  decrementReaction,
  incrementReaction,
} from "../redux/slice/postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  cool: "😎",
  wow: " 😮 ",
  funny: "😂",
  love: "❤️",
};

const Reactions = ({ post }) => {
  const dispatch = useDispatch();

  const handleIncrement = (postId, reaction) => {
    dispatch(incrementReaction({ postId, reaction }));
  };
  const handleDecrement = (reaction) => {
    dispatch(decrementReaction({ postId: post.id }));
  };
  return (
    <div>
      {Object.keys(reactionEmoji).map((reaction) => (
        <button
          onClick={() => handleIncrement(post.id, reaction)}
          className="mx-1"
          key={reaction}
        >
          {reactionEmoji[reaction]} {post.reactions[reaction]}
        </button>
      ))}
    </div>
  );
};

export default Reactions;
