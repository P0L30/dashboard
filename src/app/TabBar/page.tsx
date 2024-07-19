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

const tabBar: React.FC = () => {
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
    <div className="h-[94vh] w-[16vw] border-slate-500 border-r-2 absolute top-[6vh] left-0">
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
  );
};

export default tabBar;
