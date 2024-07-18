"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { FiCoffee } from "react-icons/fi";
import Link from "next/link";

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
      <div className="h-[100vh] w-[16vw] border-slate-500 border-r-2 absolute top-[6vh] left-0">
        <button className="w-[16vw] h-[5vh] border-slate-500 border-b-2 flex justify-start items-center pl-4 gap-2">
          <Link
            href="/orders"
            className="w-[16vw] h-[4vh] flex justify-start items-center gap-2"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"
              />
            </svg>

            <p className="text-2xl">Orders</p>
          </Link>
        </button>
        <button className="w-[16vw] h-[5vh] border-slate-500 border-b-2 flex justify-start items-center pl-4 gap-2">
          <Link
            href="revenue"
            className="w-[16vw] h-[4vh] flex justify-start items-center gap-2"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="white"
                stroke="black"
                stroke-width="4"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="white"
                stroke="black"
                stroke-width="4"
              />
              <text
                x="50%"
                y="50%"
                text-anchor="middle"
                dy=".3em"
                font-size="40"
                font-family="Arial"
                fill="black"
              >
                $
              </text>
            </svg>
            <p className="text-2xl">Revenue</p>
          </Link>
        </button>
        <button className="w-[16vw] h-[5vh] border-slate-500 border-b-2 flex justify-start items-center pl-4 gap-2">
          <Link
            href="/product"
            className="w-[16vw] h-[4vh] flex justify-start items-center gap-2"
          >
            <FiCoffee
              className="text-slate-500"
              style={{ fontSize: "30px", color: "black" }}
            />
            <p className="text-2xl">Product</p>
          </Link>
        </button>
        <button className="w-[16vw] h-[5vh] border-slate-500 border-b-2 flex justify-start items-center pl-4 gap-2">
          <Link
            href="/users"
            className="w-[16vw] h-[4vh] flex justify-start items-center gap-2"
          >
            <svg
              className="w-8 h-8 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-width="2"
                d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <p className="text-2xl">Users</p>
          </Link>
        </button>
        <button className="w-[16vw] h-[5vh] border-slate-500 border-b-2 flex justify-start items-center pl-4 gap-2">
          <Link
            href="/cost"
            className="w-[16vw] h-[4vh] flex justify-start items-center gap-2"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="white"
                stroke="black"
                stroke-width="4"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="white"
                stroke="black"
                stroke-width="4"
              />
              <text
                x="50%"
                y="50%"
                text-anchor="middle"
                dy=".3em"
                font-size="40"
                font-family="Arial"
                fill="black"
              >
                $
              </text>
            </svg>
            <p className="text-2xl">Cost</p>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default OrderManager;
