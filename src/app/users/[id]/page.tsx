"use client";

import {
  ArrowLeftOutlined,
  EyeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function UserDetail() {
  const { id } = useParams();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: albums,
    error: albumError,
    isLoading: albumLoading,
  } = useSWR(
    `https://jsonplaceholder.typicode.com/albums?_end=10&_start=0&userId=${id}`,
    fetcher
  );

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useSWR(`https://jsonplaceholder.typicode.com/users/${id}`, fetcher);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: null, record: any) => (
        <Link
          href={`/albums/${record.id}`}
          className="flex items-center px-[7px] border border-[#cacaca] hover:border-blueBg rounded-sm w-fit text-textBlack hover:text-blueText cursor-pointer"
        >
          <EyeOutlined />
          <span className="ml-2 text-sm">Show</span>
        </Link>
      ),
    },
  ];

  const formatAvatarName = (name: string) => {
    const [first = "", last = ""] = name.toLowerCase().split(" ");
    return `${first}+${last}`;
  };

  if (albumError || userError) return <div>Failed to load</div>;

  return (
    <div className="">
      <div className="flex items-center gap-2 mb-1">
        <Link
          href={"/users"}
          className="flex items-center gap-2 hover:bg-[#0000000f] px-2 py-1 rounded-md text-[#00000073] hover:text-textBlack text-sm"
        >
          <IdcardOutlined />
          <span className="">Users</span>
        </Link>
        <div>/</div>
        <span className="text-[#171717] text-sm">Show</span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Link href={"/users"}>
          <ArrowLeftOutlined className="hover:bg-[#0000000f] p-2 rounded-lg cursor-pointer" />
        </Link>
        <span className="font-medium text-black text-xl">Show User</span>
      </div>

      <div className="bg-white p-6 border-[#d5d5d5e0] border-[1px] rounded-lg">
        <div className="p-6 border-[#d5d5d5e0] border-[1px] rounded-lg">
          {userLoading ? (
            <div className="flex justify-center items-center space-x-2 bg-white dark:invert h-10">
              <span className="sr-only">Loading...</span>
              <div className="bg-gray-600 rounded-full w-3 h-3 animate-bounce [animation-delay:-0.3s]"></div>
              <div className="bg-gray-600 rounded-full w-3 h-3 animate-bounce [animation-delay:-0.15s]"></div>
              <div className="bg-gray-600 rounded-full w-3 h-3 animate-bounce"></div>
            </div>
          ) : (
            <div className="flex gap-6 pb-6 border-[#d5d5d5e0] border-b-[1px]">
              <Image
                src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${formatAvatarName(
                  user?.name
                )}`}
                alt={user?.name}
                width={32}
                height={32}
                className="rounded-full h-fit"
              />
              <div className="flex flex-col gap-2">
                <p className="font-semibold">{user?.name}</p>
                <a
                  className="text-blueText text-sm"
                  href={`mailto:${user?.email}`}
                >
                  {user?.email}
                </a>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h4 className="mb-3 font-semibold text-xl">Albums</h4>
            {albumLoading ? (
              <div className="flex justify-center items-center bg-background h-52">
                <div className="border-4 border-primary border-t-transparent rounded-full w-16 h-16 animate-spin" />
              </div>
            ) : (
              <Table dataSource={albums} columns={columns} rowKey={"id"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
