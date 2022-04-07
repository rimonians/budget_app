import React from "react";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import List from "../../components/List/List";
import Card from "../../components/Card/Card";
import { GiReceiveMoney, GiPayMoney, GiTakeMyMoney } from "react-icons/gi";

const Home = () => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const budgetState = useSelector((state) => state.budget);
  const { loading, budget, totalIncome, totalExpense } = budgetState;

  return (
    <div className={classes.homeContainer}>
      <h3>Welcome {user.displayName}</h3>
      <div className={classes.totalContainer}>
        {loading && <h3>Loading...</h3>}
        {!loading && (
          <>
            <Card
              info={{
                text: "Total income",
                totalAmount: totalIncome,
              }}
              icon={<GiReceiveMoney />}
              style={{ background: "dodgerblue" }}
            />
            <Card
              info={{
                text: "Total expense",
                totalAmount: totalExpense,
              }}
              icon={<GiPayMoney />}
              style={{ background: "crimson" }}
            />
            <Card
              info={{
                text: "Total saving",
                totalAmount: totalIncome - totalExpense,
              }}
              icon={<GiTakeMyMoney />}
              style={{ background: "purple" }}
            />
          </>
        )}
      </div>
      <div className={classes.listContainer}>
        {!loading && Object.keys(budget).length === 0 && <p>Data not found</p>}
        {Object.keys(budget).length > 0 &&
          [...budget]
            .reverse()
            .map((item) => <List key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default Home;
