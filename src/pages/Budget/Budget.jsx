import React, { useState } from "react";
import Form from "../../components/Form/Form";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import { budgetAdd } from "../../firebase.config";
import { toast } from "react-toastify";

const Budget = () => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const userId = useSelector((state) => state.auth.user.uid);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wasSubmitted) {
      setWasSubmitted(true);
      if (!source || !amount) {
        toast.error("Input field can't be empty");
        setWasSubmitted(false);
      } else {
        budgetAdd({ source, amount, userId, type }, (status, info) => {
          if (status === 200) {
            setSource("");
            setAmount("");
            toast.success(info);
            setWasSubmitted(false);
          } else {
            toast.error(info);
            setWasSubmitted(false);
          }
        });
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h3>Add Budget Form</h3>
        <Label htmlFor="source">Enter budget source</Label>
        <Input
          id="source"
          type="text"
          placeholder="Enter budget source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <Label htmlFor="amount">Enter amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter budget amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Label htmlFor="type">Enter budget type</Label>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>
        <Button style={type === "expense" ? { background: "crimson" } : {}}>
          Add {type === "expense" ? "Expense" : "Income"}
        </Button>
      </Form>
    </div>
  );
};

export default Budget;
