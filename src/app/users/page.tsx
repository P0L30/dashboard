"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { FiCoffee } from "react-icons/fi";
import TabBar from "../TabBar/page";

const formatDateTime = (date: Date) => {
  return date.toLocaleString("en-US", { hour12: true });
};

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

    setOrders([...orders, orderData]);
    setOrderCount((prevCount) => prevCount + 1);
    setUserName("");
    setUserAddress("");
    setUserOrder("");
    setOrderCost("");
    setProductSize("");
    setQuantity(1);
  };

  const handleOrderComplete = (orderNumber: number) => {
    setOrders(
      orders.map((order) =>
        order.orderNumber === orderNumber
          ? { ...order, completed: true }
          : order
      )
    );
  };

  return (
    <div className="bg-white w-screen h-screen flex flex-col items-center relative">
      <div className="absolute top-0 flex flex-row justify-between items-center w-screen left-0 px-12 py-2 mb-4 border-slate-500 border-b-2 h-[6vh]">
        <div className="flex items-center">
          <FiCoffee
            className="text-black"
            style={{ fontSize: "30px", color: "black" }}
          />
          <p style={{ fontSize: "30px", marginLeft: "10px" }}>Cafe Script</p>
        </div>
        <div className="flex items-center flex-col">
          <div>
            <p>{formatDateTime(currentDateTime)}</p>
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="w-[20vw] border-slate-500 border-2 rounded-full h-[4vh] px-2 z-50 absolute top-[8vh] left-[18vw]"
      />
      <button className="bg-slate-500 rounded-full w-[8vw] h-[4vh] flex justify-end items-center pr-8 absolute top-[8vh] left-[35vw] z-40">
        <p className="text-white">Search</p>
      </button>
      <div className="w-[80%] h-[84%] border-2 border-slate-500 rounded-3xl absolute right-[45px] top-[14vh]">
        <div className="px-[1%] py-[1%]">
          <h2>Users:</h2>
          <ul>
            {orders.map((order) => (
              <li
                key={order.orderNumber}
                className="border-b py-2 flex flex-row items-center justify-between"
              >
                <p className="text-left w-[5%]">{order.orderNumber}</p>
                <div className="border-l-2 border-black mx-2 h-full"></div>
                <div className="w-auto min-w-12 flex flex-row gap-2">
                  <p>Order:</p>
                  <p
                    className={`text-left ${
                      order.completed ? "line-through" : ""
                    }`}
                  >
                    {order.userName}
                  </p>
                </div>
                <div className="border-l-2 border-black mx-2 h-full"></div>
                <div className="w-auto min-w-12 flex flex-row gap-2">
                  <p>Address:</p>
                  <p
                    className={`text-left ${
                      order.completed ? "line-through" : ""
                    }`}
                  >
                    {order.userAddress}
                  </p>
                </div>
                <div className="border-l-2 border-black mx-2 h-full"></div>
                <div className="w-auto min-w-12 flex flex-row gap-2">
                  <p>Order:</p>
                  <p
                    className={`text-left ${
                      order.completed ? "line-through" : ""
                    }`}
                  >
                    {order.userOrder}
                  </p>
                </div>
                <div className="border-l-2 border-black mx-2 h-full"></div>
                <div className="w-auto min-w-12 flex flex-row gap-2">
                  <p>Size:</p>
                  <p
                    className={`text-left ${
                      order.completed ? "line-through" : ""
                    }`}
                  >
                    {order.productSize}
                  </p>
                </div>
                <div className="border-l-2 border-black mx-2 h-full"></div>
                <div className="w-auto min-w-12 flex flex-row gap-2">
                  <p>Quantity:</p>
                  <p
                    className={`text-left ${
                      order.completed ? "line-through" : ""
                    }`}
                  >
                    {order.quantity}
                  </p>
                </div>
                <div className="border-l-2 border-black mx-2 h-full"></div>
                <div className="w-auto min-w-12 flex flex-row gap-2">
                  <p>Price:</p>
                  <p
                    className={`text-left ${
                      order.completed ? "line-through" : ""
                    }`}
                  >
                    {order.orderCost}
                  </p>
                </div>
                <div className="border-l-2 border-black mx-2 h-full"></div>
                <div className="w-auto min-w-12 flex flex-row gap-2">
                  <p>Date:</p>
                  <p
                    className={`text-left ${
                      order.completed ? "line-through" : ""
                    }`}
                  >
                    {formatDateTime(order.orderDate)}
                  </p>
                </div>
                <div className="border-l-2 border-black mx-2 h-full"></div>
                <button
                  className={`border-black border-2 rounded w-[10%] ${
                    order.completed ? "text-black" : ""
                  }`}
                  onClick={() => handleOrderComplete(order.orderNumber)}
                >
                  {order.completed ? "Complete" : "Done"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <TabBar></TabBar>
    </div>
  );
};

export default OrderManager;
