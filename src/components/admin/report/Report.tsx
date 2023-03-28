import axios from "axios";
import { Notify } from "notiflix";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { CheckLoadingState } from "../../checkLoadingState/CheckLoadingState";
import { monthNames } from "../../timeStamp/TimeStamp";
import { TransactionDuration } from "../../transactionDuration/TransactionDuration";
import { defaultPeriod, IDuration } from "../transactions/Transactions";
import styles from "./report.module.scss";

interface IMonthlyReport {
  sales: number;
  credits: number;
  expenses: number;
  deductions: number;
  businessRevenue: number;
  debts: number;
  revenueToBeUsedToSettleDebts: number;
  profit: number;
  sharableRevenue: number;
  rylRevenue: number;
  debitsForRyl: number;
  expectedPayToRyl: number;
  lanRevenue: number;
  debitsForLan: number;
  expectedPayToLan: number;
}

const initialState: IMonthlyReport = {
  sales: 0,
  credits: 0,
  expenses: 0,
  deductions: 0,
  businessRevenue: 0,
  debts: 0,
  revenueToBeUsedToSettleDebts: 0,
  profit: 0,
  sharableRevenue: 0,
  rylRevenue: 0,
  debitsForRyl: 0,
  expectedPayToRyl: 0,
  lanRevenue: 0,
  debitsForLan: 0,
  expectedPayToLan: 0,
};

export const Report = () => {
  const [salesPeriod, setSalesPeriod] = useState(defaultPeriod);
  const [loading, setLoading] = useState<boolean>(false);
  const [monthlyReport, setMonthlyReport] = useState(initialState);
  const {
    sales,
    expenses,
    credits,
    businessRevenue,
    sharableRevenue,
    lanRevenue,
    debitsForLan,
    expectedPayToLan,
    rylRevenue,
    debitsForRyl,
    expectedPayToRyl,
  } = monthlyReport;

  const monthName = monthNames[salesPeriod.month - 1];
  const year = salesPeriod.year;

  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  const changeSalesPeriod = (data: IDuration) => {
    setSalesPeriod(data);
  };

  //get monthly report from db
  const [err403, setErr403] = useState(false);

  useEffect(() => {
    const getMonthlyReport = async () => {
      setLoading(true);
      try {
        await axios({
          method: "post",
          url: `http://localhost:5000/analytics/monthly`,
          data: salesPeriod,
          headers: headers,
        }).then((res) => {
          setMonthlyReport(res.data);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);

        if (axios.isAxiosError(error)) {
          setLoading(false);
          const axiosError = error;

          axiosError.response?.status == 403 && setErr403(true);
        } else {
          console.error(error);
          Notify.failure(`${error}!`);
        }
      }
    };
    getMonthlyReport();
  }, [salesPeriod]);

  const navigate = useNavigate();
  err403 && navigate("/login");
  //

  return (
    <CheckLoadingState loading={loading}>
      <div className={styles.report}>
        <div className={styles.header}>
          <h1>monthly report</h1>
          <div>
            <TransactionDuration
              updateTransactionDuration={changeSalesPeriod}
            />
          </div>
        </div>

        <div className={styles.data}>
          <div className={styles.header}>
            <h1>
              {monthName} {year} Business report
            </h1>
          </div>

          <div className={styles["report-data"]}>
            <div className={styles["the-data"]}>
              <h4>sales</h4>
              <p>Ksh {sales}</p>
            </div>
            <div className={styles["the-data"]}>
              <h4>credits</h4>
              <p>Ksh {credits}</p>
            </div>
            <div className={styles["the-data"]}>
              <h4>expenses</h4>
              <p>Ksh {expenses}</p>
            </div>
            <div className={styles["the-data"]}>
              <h4>businessRevenue</h4>
              <p>Ksh {businessRevenue.toFixed(2)}</p>
            </div>
            <div className={styles["the-data"]}>
              <h4>sharableRevenue</h4>
              <p>Ksh {sharableRevenue.toFixed(2)}</p>
            </div>
            <div className={styles["the-data"]}>
              <h4>rylRevenue</h4>
              <p>Ksh {rylRevenue.toFixed(2)}</p>
            </div>
            <div className={styles["the-data"]}>
              <h4>ryl Debits</h4>
              <p>Ksh {debitsForRyl.toFixed(2)}</p>
            </div>
            <div className={styles["the-data"]}>
              <h4>total Pay -r</h4>
              <p>Ksh {expectedPayToRyl.toFixed(2)}</p>
            </div>
            <div className={styles["the-data"]}>
              <h4>lanRevenue</h4>
              <p>Ksh {lanRevenue.toFixed(2)}</p>
            </div>
            <div className={styles["the-data"]}>
              <h4>lan debits</h4>
              <p>Ksh {debitsForLan.toFixed(2)}</p>
            </div>
            <div className={styles["the-data"]}>
              <h4>total pay -l </h4>
              <p>Ksh {expectedPayToLan.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </CheckLoadingState>
  );
};
