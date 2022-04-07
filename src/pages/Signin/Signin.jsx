import React, { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { authSigninInitiate } from "../../redux/auth/authActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigate("/");
    }
    return () => {};
  }, [user]);

  const handleSignin = (e) => {
    e.preventDefault();
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
  };

  return (
    <div>
      <Form onSubmit={handleSignin}>
        <h3>Signin Form</h3>
        <Label htmlFor="email">Enter email address</Label>
        <Input
          id="email"
          type="text"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="password">Enter password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Signin</Button>
      </Form>
    </div>
  );
};

export default Signin;
