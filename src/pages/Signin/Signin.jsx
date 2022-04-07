import React, { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { authSigninInitiate } from "../../redux/auth/authActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import scrollTop from "../../utils/scrollTop";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigate("/");
    }
    return () => {};
  }, [user]);

  const handleSignin = (e) => {
    e.preventDefault();
    if (email && password) {
      if (!wasSubmitted) {
        setWasSubmitted(true);
        dispatch(
          authSigninInitiate(email, password, (user, info) => {
            if (user) {
              setEmail("");
              setPassword("");
              toast.success(info);
              setTimeout(() => {
                navigate("/");
              }, 1000);
            } else {
              toast.error(info);
              setWasSubmitted(false);
            }
          })
        );
      }
    } else {
      toast.error("অনুগ্রহ করে সবগুলো তথ্য দিন");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSignin}>
        <h3>সাইন ইন ফর্ম</h3>
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
        <Button>সাইন ইন করুন</Button>
      </Form>
    </div>
  );
};

export default Signin;
