

import  { useState } from 'react';

const Coments = ({ coment = {},
   onSubmitComment = () => {},
   onEditComment = () => {},
   onDeleteComment = () => {}
   }) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(coment.content);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditedContent(coment.content)
  };

  const handleEditSubmit=()=>{
    onEditComment(coment.id,editedContent)
    setEditMode(false)
  }

  const handleChange = (e) => {
    if(editMode){
      setEditedContent(e.target.value)
    }else{

      setReplyContent(e.target.value);
    }
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleReplySubmit = () => {
    if (replyContent) {
      onSubmitComment(coment.id, replyContent);
      setReplyContent("");
    }
  };
  const handleDelete = () => {
    onDeleteComment(coment.id);
  };


  return (
    <div className='coment'>
     {!editMode? <>
        <p className='coment-content'>{coment.content}</p>
        <p className='coment-info'>Votes: {coment.votes}</p>
        <p>{coment.timestamp}</p>
        <p className='coment-info'>{new Date(coment.timestamp).toLocaleString()}</p>
      </>:(
         <div className='add-Coment'>
         <textarea
           rows={3}
           cols={50}
           value={editedContent}
           className='coment-textarea'
           placeholder='add a comment'
           onChange={handleChange}
         ></textarea>
         <button className='coment-button'onClick={handleEditSubmit}>
          Save Edit 
         </button>
         <button className='coment-button' onClick={toggleEditMode}>
           cancel Edit
         </button>
       </div>
      )
      }



      <div className='comment-actions'>
        <button onClick={toggleExpand} className='coment-button'>{expand ? "Hide Replies" : "Reply"}</button>
        <button className='coment-button' onClick={toggleEditMode}>Edit</button>
        <button className='coment-button' onClick={handleDelete}>Delete</button>
      </div>
      {expand && (
        <div className='coment-replies'>
          <div className='add-Coment'>
            <textarea
              rows={3}
              cols={50}
              value={replyContent}
              className='coment-textarea'
              placeholder='add a comment'
              onChange={handleChange}
            ></textarea>
            <button className='coment-button' onClick={handleReplySubmit}>
              Add coment
            </button>
          </div>
          {coment.replies && coment.replies.map((reply) => {
            return (
              <Coments
                key={reply.id}
                coment={reply}
                onSubmitComment={onSubmitComment}
                onDeleteComment={onDeleteComment}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Coments;
