import React, { useState } from 'react';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

const LikeDislikeButtons = ({ likes, dislikes, onLike, onDislike }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setHasLiked(false);
    } else {
      setHasLiked(true);
      setHasDisliked(false);
    }
    onLike();
  };

  const handleDislike = () => {
    if (hasDisliked) {
      setHasDisliked(false);
    } else {
      setHasLiked(false);
      setHasDisliked(true);
    }
    onDislike();
  };

  return (
      <div className="flex mt-2">
        <ThumbUp
            onClick={handleLike}
            style={{ cursor: 'pointer', color: hasLiked ? 'blue' : 'black' }}
        />
        <span className="mx-2">{likes}</span>
        <ThumbDown
            onClick={handleDislike}
            style={{ cursor: 'pointer', color: hasDisliked ? 'red' : 'black' }}
        />
        <span className="mx-2">{dislikes}</span>
      </div>
  );
};

export default LikeDislikeButtons;
