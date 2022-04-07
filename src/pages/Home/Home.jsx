import React, { useEffect } from "react";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import List from "../../components/List/List";
import Card from "../../components/Card/Card";
import { GiReceiveMoney, GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import scrollTop from "../../utils/scrollTop";

const Home = () => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const budgetState = useSelector((state) => state.budget);
  const { loading, budget, totalIncome, totalExpense } = budgetState;

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className={classes.homeContainer}>
      <h3 className={classes.greet}>
        স্বাগতম <span>{user.displayName}</span>
      </h3>
      <div className={classes.totalContainer}>
        {loading && <h3>লোড হচ্ছে...</h3>}
        {!loading && (
          <>
            <Card
              info={{
                text: "সর্বোমোট আয়",
                totalAmount: totalIncome,
              }}
              icon={<GiReceiveMoney />}
              style={{ background: "dodgerblue" }}
            />
            <Card
              info={{
                text: "সর্বোমোট ব্যয়",
                totalAmount: totalExpense,
              }}
              icon={<GiPayMoney />}
              style={{ background: "crimson" }}
            />
            <Card
              info={{
                text: "সর্বোমোট সঞ্চয়",
                totalAmount: totalIncome - totalExpense,
              }}
              icon={<GiTakeMyMoney />}
              style={{ background: "purple" }}
            />
          </>
        )}
      </div>
      <div className={classes.listContainer}>
        {!loading && Object.keys(budget).length === 0 && (
          <p>বাজেট খুঁজে পাওয়া যায়নি</p>
        )}
        {Object.keys(budget).length > 0 &&
          [...budget]
            .reverse()
            .map((item) => <List key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default Home;
