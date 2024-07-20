import { useState } from "react";
import "./styles.css";
import UseComentTree from "../hooks/use_coment_tree";
import Coments from "./coments";

// eslint-disable-next-line react/prop-types
const NestedComents = ({
  coments,
  onSubmit = () => {},
  onEdit = () => {content},
  onDelete = () => {},
}) => {
  const [coment, setComent] = useState("");
  const {
    coments: comentsData,
    insertComent,
    editComent,
    deleteComment,
  } = UseComentTree(coments);

  const handleChange = (e) => {
    setComent(e.target.value);
  };

  const handleSubmit = () => {
    //logic
    if (coment) {
      handleReply(null, coment); // Insert the new comment
      setComent("");
    }
  };

  const handleReply = (comentId, content) => {
    insertComent(comentId, content);
    onsubmit(content);
  };
  const handleEdit = (comentId, content) => {
    editComent(comentId, content);
    onEdit(content);
  };
  const handleDelete = (comentId) => {
    deleteComment(comentId);
    onDelete(comentId);
  };
  console.log(comentsData, "comentsData");

  return (
    <>
      <div className="add-Coment">
        <textarea
          onChange={handleChange}
          rows={3}
          cols={50}
          value={coment}
          className="coment-textarea"
          placeholder="add a comment"
        ></textarea>
        <button className="coment-button" onClick={handleSubmit}>
          Add coment
        </button>
      </div>
      {comentsData &&
        comentsData.map((coment) => {
          return (
            <Coments
              key={coment.id}
              coment={coment}
              onSubmitComment={handleReply}
              onEditComment={handleEdit}
              onDeleteComment={handleDelete}
            />
          );
        })}
    </>
  );
};

export default NestedComents;
