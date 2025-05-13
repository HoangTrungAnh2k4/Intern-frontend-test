"use client";

import { EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { listUserAPI, listAlbumAPI, avatarImageAPI } from "@/apis";

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
}

function Albums() {
  const [listUserId, setListUserId] = useState<number[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageSize = Number(searchParams.get("pageSize")) || 20;
  const currentPage = Number(searchParams.get("current")) || 1;

  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = currentPage * pageSize;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: albums,
    error: albumsError,
    isLoading: albumsLoading,
  } = useSWR<Album[]>(listAlbumAPI(pageEnd, pageStart), fetcher);

  const { data: users } = useSWR(
    listUserId.length > 0 ? listUserAPI(listUserId) : null,
    fetcher
  );

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

        return (
          <Link
            href={`/users/${record.userId}`}
            className="flex items-center px-[7px] rounded-sm w-fit cursor-pointer"
          >
            <Image
              src={avatarImageAPI(user?.name)}
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
  const handleChangePagination = (pagination: any) => {
    const newPage = pagination.current;
    const newPageSize = pagination.pageSize;

    const params = new URLSearchParams(searchParams.toString());
    params.set("current", newPage);
    params.set("pageSize", newPageSize);

    router.replace(`${pathname}?${params.toString()}`);
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
      }}
      onChange={handleChangePagination}
    />
  );
}

export default function AlbumsPage() {
  return (
    <Suspense fallback={<div>Loading albums...</div>}>
      <Albums />
    </Suspense>
  );
}
