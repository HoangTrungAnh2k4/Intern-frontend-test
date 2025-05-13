"use client";

import { EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
}

export default function Albums() {
  const [listUserId, setListUserId] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = currentPage * pageSize;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: albums,
    error: albumsError,
    isLoading: albumsLoading,
  } = useSWR<Album[]>(
    `https://jsonplaceholder.typicode.com/albums?_end=${pageEnd}&_start=${pageStart}`,
    fetcher
  );

  const usersQuery = listUserId.length
    ? `https://jsonplaceholder.typicode.com/users?_end=10&_start=0&${listUserId
        .map((id) => `id=${id}`)
        .join("&")}`
    : null;

  const { data: users } = useSWR(usersQuery, fetcher);

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
      title: "User ",
      dataIndex: "userId",
      key: "userId",
      render: (_: null, record: Album) => {
        const user = users?.find((user: User) => user.id === record.userId);

        if (!user) {
          return (
            <div className="flex items-center px-[7px] w-fit">Loading...</div>
          );
        }

        const [first = "", last = ""] = user?.name.toLowerCase().split(" ");
        const avatarName = `${first}+${last}`;

        return (
          <Link
            href={`/users/${record.userId}`}
            className="flex items-center px-[7px] rounded-sm w-fit cursor-pointer"
          >
            <Image
              src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${avatarName}`}
              alt={user?.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="ml-2 text-blueText text-sm">{user?.name}</span>
          </Link>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: null, record: Album) => (
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (pagination: any) => {
    setCurrentPage(pagination.current);
  };

  useEffect(() => {
    if (albums) {
      const userIds = [...new Set(albums.map((album: Album) => album.userId))];
      setListUserId(userIds);
    }
  }, [albums]);

  if (albumsError) return <div>Failed to load</div>;
  if (albumsLoading)
    return (
      <div className="flex justify-center items-center bg-background h-52">
        <div className="border-4 border-primary border-t-transparent rounded-full w-16 h-16 animate-spin" />
      </div>
    );

  return (
    <div className="">
      <Table
        dataSource={albums}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: pageSize,
          total: 100,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showLessItems: false,
          current: currentPage,
          onShowSizeChange(_, size) {
            setCurrentPage(1);
            setPageSize(size);
            window.scrollTo(0, 0);
          },
        }}
        onChange={handleChange}
      />
    </div>
  );
}
