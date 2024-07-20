

import { useState } from 'react';

const UseComentTree = (initialComents) => {
  const [coments, setComents] = useState(initialComents);

  const insertNode = (tree, commentId, content) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, content],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };

  const insertComent = (commentId, content) => {
    const newComment = {
      id: Date.now(),  
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setComents((prevComments) => insertNode(prevComments, commentId, newComment));
    } else {
      setComents((prevComments) => [newComment, ...prevComments]);
    }
  };





  const editNode = (tree, commentId, content) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content,
          timestamp:new Date().toISOString()
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };

  const editComent = (commentId, content) => {
 

      setComents((prevComments) => editNode(prevComments, commentId, content));
  };

  const deleteNode = (tree, commentId) => {
    return tree
      .filter((comment) => comment.id !== commentId)
      .map((comment) => ({
        ...comment,
        replies: deleteNode(comment.replies, commentId),
      }));
  };

  const deleteComment = (commentId) => {
    setComents((prevComments) => deleteNode(prevComments, commentId));
  };

  return {
    coments,
    insertComent,
    editComent,
    deleteComment
  };
};

export default UseComentTree;
