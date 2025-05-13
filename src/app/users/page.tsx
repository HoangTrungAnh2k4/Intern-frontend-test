"use client";

import { EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import { listUserAPI, avatarImageAPI } from "@/apis";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;

  phone: string;
  website: string;
}

export default function Users() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(listUserAPI([]), fetcher);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Avatar",
      dataIndex: "name",
      key: "avatar",
      render: (text: string) => {
        return (
          <Image
            src={avatarImageAPI(text)}
            alt={text}
            width={32}
            height={32}
            className="rounded-full"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text: string) => <a href={`tel:${text}`}>{text}</a>,
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (text: string) => (
        <a href={`http://${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: null, record: User) => (
        <Link
          href={`/users/${record.id}`}
          className="flex items-center px-[7px] border border-[#cacaca] hover:border-blueBg rounded-sm w-fit hover:text-blueText cursor-pointer"
        >
          <EyeOutlined />
          <span className="ml-2 text-sm">Show</span>
        </Link>
      ),
    },
  ];

  if (error) return <div>Failed to load</div>;
  if (isLoading)
    return (
      <div className="flex justify-center items-center bg-background h-52">
        <div className="border-4 border-primary border-t-transparent rounded-full w-16 h-16 animate-spin" />
      </div>
    );

  return (
    <div className="">
      <h4 className="mb-3 text-xl">Users</h4>
      <Table dataSource={data} columns={columns} rowKey={"id"} />
    </div>
  );
}
