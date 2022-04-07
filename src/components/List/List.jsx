import React from "react";
import classes from "./List.module.css";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { budgetDelete } from "../../firebase.config";
import { toast } from "react-toastify";
import numbering from "../../utils/numbering";

const List = ({ item }) => {
  const handleDelete = (e) => {
    if (window.confirm("সত্যি মুছে ফেলতে চান?")) {
      budgetDelete(e.currentTarget.value, (status, info) => {
        if (status === 200) {
          toast.success(info);
        } else {
          toast.error(info);
        }
      });
    }
  };

  return (
    <div
      className={`${classes.list} ${
        classes[item.type === "income" ? "income" : "expense"]
      }`}
    >
      <div className={classes.info}>
        <h3>{item.source}</h3>
        <p>{numbering(item.amount)} ৳</p>
      </div>
      <div className={classes.action}>
        <button value={item.id} onClick={handleDelete}>
          <RiDeleteBin2Fill />
        </button>
      </div>
    </div>
  );
};

export default List;
