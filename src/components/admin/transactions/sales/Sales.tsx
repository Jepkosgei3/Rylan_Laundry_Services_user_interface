import React, { useState } from "react";
import styles from "../transactions.module.scss";
import { BsPlus } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { TransactionInputForm } from "../../../transactionInputForm/TransactionInputForm";

export const editIcon = <FiEdit color="#36b9cc" />;
export const deleteIcon = <MdOutlineDelete color="#e64b3b" />;
export const plusIcon = <BsPlus />;

export const Sales = () => {
  const [showInputForm, setShowInputForm] = useState<boolean>(false);

  const handleToggle = (hideForm: boolean) => {
    setShowInputForm(hideForm);
  };

  return (
    <>
      {showInputForm && <TransactionInputForm onToggle={handleToggle} />}
      <div className={styles.transactions}>
        <div className={styles.header}>
          <div className={styles.wrapper}>
            <h1>Sales data</h1>
            <div className={styles["transactions-duration"]}>
              <form>
                <input type="number" placeholder="month" required />
                <input type="number" placeholder="year" required />
                <button className={`btn }`} style={{ padding: "7px" }}>
                  Get data
                </button>
              </form>
            </div>
          </div>
          <button
            onClick={() => setShowInputForm(!showInputForm)}
            className={`btn`}
          >
            <BsPlus /> <span>Add sale</span>
          </button>
        </div>

        <div className={styles["transactions-data"]}>
          <div className={styles.header}>
            <h2>February 2023 sales</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1fdsse3</td>
                <td>Leila</td>
                <td>150</td>
                <td>2/2/2023</td>
                <td className={styles.action}>
                  <div>{editIcon}</div>
                  <div>{deleteIcon}</div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>1fdsse3</td>
                <td>Leila</td>
                <td>150</td>
                <td>2/2/2023</td>
                <td className={styles.action}>
                  <div>{editIcon}</div>
                  <div>{deleteIcon}</div>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>1fdsse3</td>
                <td>Leila</td>
                <td>150</td>
                <td>2/2/2023</td>
                <td className={styles.action}>
                  <div>{editIcon}</div>
                  <div>{deleteIcon}</div>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>1fdsse3</td>
                <td>Leila</td>
                <td>150</td>
                <td>2/2/2023</td>
                <td className={styles.action}>
                  <div>{editIcon}</div>
                  <div>{deleteIcon}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
