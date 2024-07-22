"use client";
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";

const isNewDay = (lastDate: Date) => {
  const now = new Date();
  return (
    now.getDate() !== lastDate.getDate() ||
    now.getMonth() !== lastDate.getMonth() ||
    now.getFullYear() !== lastDate.getFullYear()
  );
};

interface Order {
  orderNumber: number;
  userName: string;
  userAddress: string;
  userOrder: string;
  productSize: string;
  orderCost: number;
  quantity: number;
  orderDate: Date;
  completed: boolean;
}

const OrderManager: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [orderCount, setOrderCount] = useState<number>(0);
  const [lastOrderDate, setLastOrderDate] = useState<Date>(new Date());
  const [orders, setOrders] = useState<Order[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userOrder, setUserOrder] = useState<string>("");
  const [orderCost, setOrderCost] = useState<number | "">("");
  const [productSize, setProductSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    if (isNewDay(lastOrderDate)) {
      setOrderCount(0);
      setLastOrderDate(new Date());
    }

    return () => clearInterval(timer);
  }, [lastOrderDate]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders ")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error);
      });
  }, []);

  const handleNewOrder = (e: FormEvent) => {
    e.preventDefault();

    const orderData: Order = {
      orderNumber: orderCount + 1,
      userName,
      userAddress,
      userOrder,
      orderCost: Number(orderCost),
      productSize,
      quantity,
      orderDate: new Date(),
      completed: false,
    };

    axios
      .post("http://localhost:5000/orders", orderData)
      .then((response) => {
        setOrders([...orders, response.data]);
        setOrderCount((prevCount) => prevCount + 1);
        setUserName("");
        setUserAddress("");
        setUserOrder("");
        setOrderCost("");
        setProductSize("");
        setQuantity(1);
      })
      .catch((error) => {
        console.error("There was an error creating the order!", error);
      });
  };

  return (
    <div className="bg-white w-screen h-screen flex justify-center items-center relative">
      <form onSubmit={handleNewOrder} className="space-y-4">
        <div>
          <label>Order Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="border px-2 py-1 w-full rounded-full border-slate-500"
          />
        </div>
        <div>
          <label>User Address:</label>
          <input
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            required
            className="border px-2 py-1 w-full rounded-full border-slate-500"
          />
        </div>
        <div>
          <label>User Order:</label>
          <input
            type="text"
            value={userOrder}
            onChange={(e) => setUserOrder(e.target.value)}
            required
            className="border px-2 py-1 w-full rounded-full border-slate-500"
          />
        </div>
        <div>
          <label>Order Cost:</label>
          <input
            type="number"
            value={orderCost}
            onChange={(e) => setOrderCost(Number(e.target.value))}
            required
            className="border px-2 py-1 w-full rounded-full border-slate-500"
          />
        </div>
        <div>
          <label>Size:</label>
          <input
            type="text"
            value={productSize}
            onChange={(e) => setProductSize(e.target.value)}
            required
            className="border px-2 py-1 w-full rounded-full border-slate-500"
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            className="border px-2 py-1 w-full rounded-full border-slate-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderManager;
