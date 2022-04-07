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
        toast.error("অনুগ্রহ করে সবগুলো তথ্য দিন");
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
        <h3>বাজেট ফর্ম</h3>
        <Label htmlFor="source">বাজেটের উৎস</Label>
        <Input
          id="source"
          type="text"
          placeholder="বাজেটের উৎস লিখুন"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <Label htmlFor="amount">বাজেটের পরিমাণ</Label>
        <Input
          id="amount"
          type="number"
          placeholder="বাজেটের পরিমাণ লিখুন"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Label htmlFor="type">বাজেটের ধরণ</Label>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">আয়</option>
          <option value="expense">ব্যয়</option>
        </Select>
        <Button style={type === "expense" ? { background: "crimson" } : {}}>
          {type === "expense" ? "ব্যয়" : "আয়"} হিসেবে যোগ করুন
        </Button>
      </Form>
    </div>
  );
};

export default Budget;
