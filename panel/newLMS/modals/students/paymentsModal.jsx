import { Button, Divider, List, Modal, Space, Tag } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { API } from "../../../../config/API";

const PaymentModels = ({
  paymentModels,
  setPaymentModel,
  current,
  setCurrent,
}) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [currentPayment, setCurrentPayment] = useState({});

  const [completed, setCompleted] = useState(false);
  const [amount, setAmount] = useState(0);
  const [comment, setComment] = useState("");
  const [batchId, setBatchId] = useState("");

  const [paymentLoading, setPaymentLoading] = useState(false);

  const addPayments = async (e) => {
    e.preventDefault();

    try {
      if (!amount || !comment || !batchId) {
        return toast.error("Fields are required**");
      } else {
        setPaymentLoading(true);
        const { data } = await axios.put(
          `${API}/lms//add/${current._id}/${batchId}/payments`,
          {
            amount,
            comment,
            completed,
          }
        );
        if (data.ok) {
          toast.success("Payment is added successfully");
          setPaymentLoading(false);
          setCurrent({
            ...current,
            payments: [
              ...current.payments,
              { amount, comment, completed, batch: batchId },
            ],
          });

          setAmount(0);
          setCompleted(false);
          setComment("");
          setBatchId("");
        }
      }
    } catch (error) {
      setPaymentLoading(false);

      console.log(error);
    }
  };

  const updatePayment = async (e) => {
    e.preventDefault();

    try {
      if (!amount || !comment) {
        return toast.error("Fields are required**");
      } else {
        setPaymentLoading(true);
        const { data } = await axios.put(
          `${API}/lms/update/${current._id}/${currentPayment._id}/${currentPayment.batch}/payments`,
          {
            amount,
            comment,
            completed,
          }
        );
        if (data.ok) {
          setPaymentLoading(false);
          toast.success("Added");
          setAmount(0);
          setComment("");
          setCompleted(false);
          setCurrent({
            ...current,
            payments: [...current.payments, { completed, completed, amount }],
          });
        }
      }
    } catch (error) {
      setPaymentLoading(false);

      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title={`${current.name}`}
        centered
        open={paymentModels}
        onOk={() => setPaymentModel(false)}
        onCancel={() => setPaymentModel(false)}
        width={900}
      >
        <br />
        <Tag color="green" role="button" onClick={() => setOpen(true)}>
          Add Payment
        </Tag>

        <Divider orientation="left">Payments</Divider>
        <List
          size="small"
          bordered
          dataSource={current?.payments}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Tag
                  color="blue"
                  role="button"
                  onClick={() => {
                    setCurrentPayment(item);
                    setOpen2(true);
                    setAmount(item.amount);
                    setComment(item.comment);
                    setCompleted(item.completed);
                  }}
                >
                  Update
                </Tag>,
              ]}
            >
              <List.Item.Meta
                title={item.batch}
                description={
                  <Space wrap>
                    <Tag> {item.amount} </Tag>
                    <Tag> completed: {item.completed ? "yes" : "no"} </Tag>
                    <Tag> comment: {item.comment} </Tag>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        title={`Add Payments`}
        centered
        open={open}
        onOk={addPayments}
        onCancel={() => setOpen(false)}
        width={500}
      >
        {JSON.stringify({ comment, amount, completed, batchId })}
        {paymentLoading && <p>loading...</p>}
        <form onSubmit={addPayments}>
          <div className="my-2">
            <label>Amount</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label>Comment</label>
            <input
              type="text"
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-start align-items-center gap-3 my-2">
            <label>Is Complete?</label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(!completed)}
            />
          </div>

          {current?.enrolledBatches?.length > 0 && (
            <div className="form-group py-2">
              <label> Select From Enrolled Batches </label>
              <select
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="form-control"
                name="batchId"
              >
                <option>* Select From Enrolled Batches</option>
                {current?.enrolledBatches?.map((x, index) => (
                  <option key={index} value={x._id}>
                    {x.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {current?.completedBatches?.length > 0 && (
            <div className="form-group py-2">
              <label> Select From Completed Batches </label>
              <select
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="form-control"
                name="batchId"
              >
                <option>* Select From Completed Batches</option>
                {current?.completedBatches?.map((x, index) => (
                  <option key={index} value={x._id}>
                    {x.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </form>
      </Modal>

      <Modal
        title={`Update Payment`}
        centered
        open={open2}
        onOk={updatePayment}
        onCancel={() => setOpen2(false)}
        width={500}
      >
        {JSON.stringify({
          comment,
          amount,
          completed,
          batchId: currentPayment.batch,
        })}
        {paymentLoading && <p>loading...</p>}
        <form onSubmit={updatePayment}>
          <div className="my-2">
            <label>Amount</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label>Comment</label>
            <input
              type="text"
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-start align-items-center gap-3 my-2">
            <label>Is Complete?</label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(!completed)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PaymentModels;
