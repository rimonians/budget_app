import React, { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import { signup } from "../../firebase/firebase.auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import scrollTop from "../../utils/scrollTop";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigate("/");
    }
  }, [user]);

  const handleSignup = (e) => {
    e.preventDefault();
    if (username && email && password) {
      if (!wasSubmitted) {
        setWasSubmitted(true);
        signup(username, email, password, (user, info) => {
          if (user) {
            setUsername("");
            setEmail("");
            setPassword("");
            toast.success(info);
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            toast.error(info);
            setWasSubmitted(false);
          }
        });
      }
    } else {
      toast.error("অনুগ্রহ করে সবগুলো তথ্য দিন");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSignup}>
        <h3>সাইন আপ ফর্ম</h3>
        <Label htmlFor="username">ইউজারনেম দিন</Label>
        <Input
          id="username"
          type="text"
          placeholder="ইউজারনেম দিন"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Label htmlFor="email">ইমেইল এড্রেস দিন</Label>
        <Input
          id="email"
          type="text"
          placeholder="ইমেইল এড্রেস দিন"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="password">পাসওয়ার্ড দিন</Label>
        <Input
          id="password"
          type="password"
          placeholder="পাসওয়ার্ড দিন"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>সাইন আপ করুন</Button>
      </Form>
    </div>
  );
};

export default Signup;
