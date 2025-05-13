"use client";

import {
  ArrowLeftOutlined,
  EyeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

import { albumsOfUserAPI, userDetailAPI, avatarImageAPI } from "@/apis";

export default function UserDetail() {
  const { id } = useParams();
  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: albums,
    error: albumError,
    isLoading: albumLoading,
  } = useSWR(albumsOfUserAPI(id as string), fetcher);

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useSWR(userDetailAPI(Number(id)), fetcher);

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

  if (albumError || userError) return <div>Failed to load, retry again!</div>;

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
        <button
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftOutlined className="hover:bg-[#0000000f] p-2 rounded-lg cursor-pointer" />
        </button>
        <span className="font-medium text-black text-xl">Show User</span>
      </div>

      <div className="bg-white p-6 border-[#d5d5d5e0] border-[1px] rounded-lg">
        <div className="p-6 border-[#d5d5d5e0] border-[1px] rounded-lg">
          {userLoading ? (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 mb-4 rounded-full w-48 h-2.5"></div>
              <div className="bg-gray-200 dark:bg-gray-700 mb-2.5 rounded-full max-w-[360px] h-2"></div>
              <div className="bg-gray-200 dark:bg-gray-700 mb-2.5 rounded-full max-w-[300px] h-2"></div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full max-w-[360px] h-2"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="flex gap-6 pb-6 border-[#d5d5d5e0] border-b-[1px]">
              <Image
                src={avatarImageAPI(user?.name)}
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
