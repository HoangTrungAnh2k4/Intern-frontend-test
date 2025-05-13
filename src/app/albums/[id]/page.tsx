"use client";

import { ArrowLeftOutlined, UnorderedListOutlined } from "@ant-design/icons";

import { Image } from "antd";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function AlbumDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [userId, setUserId] = useState<number>();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: albumDetail,
    error: albumError,
    isLoading: albumLoading,
  } = useSWR(`https://jsonplaceholder.typicode.com/albums/${id}`, fetcher);

  const { data: photos } = useSWR(
    `https://jsonplaceholder.typicode.com/photos?_end=10&_start=0&albumId=${id}`,
    fetcher
  );

  const usersQuery = userId
    ? `https://jsonplaceholder.typicode.com/users/${userId}`
    : null;

  const { data: user, error: userError } = useSWR(usersQuery, fetcher);

  const formatAvatarName = (name: string) => {
    if (!name) return "";

    const [first = "", last = ""] = name.toLowerCase().split(" ");
    return `${first}+${last}`;
  };

  useEffect(() => {
    if (albumDetail) {
      setUserId(albumDetail.userId);
    }
  }, [albumDetail]);

  if (albumError || userError) return <div>Failed to load, retry again!</div>;

  return (
    <div className="">
      <div className="flex items-center gap-2 mb-1">
        <Link
          href={"/albums"}
          className="flex items-center gap-2 hover:bg-[#0000000f] px-2 py-1 rounded-md text-[#00000073] hover:text-textBlack text-sm"
        >
          <UnorderedListOutlined />
          <span className="">Albums</span>
        </Link>
        <div>/</div>
        <span className="text-[#171717] text-sm">Show</span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => router.back()}>
          <ArrowLeftOutlined className="hover:bg-[#0000000f] p-2 rounded-lg cursor-pointer" />
        </button>
        <span className="font-medium text-black text-xl">Show Album</span>
      </div>

      <div className="bg-white p-6 border-[#d5d5d5e0] border-[1px] rounded-lg">
        <div className="p-6 border-[#d5d5d5e0] border-[1px] rounded-lg">
          {!user ? (
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
                src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${formatAvatarName(
                  user?.name
                )}`}
                alt="username"
                width={32}
                height={32}
                className="rounded-full h-fit"
              />
              <div className="flex flex-col gap-2">
                <Link href={`/users/${user?.id}`} className="font-semibold">
                  {user?.name}
                </Link>
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
            <h4 className="mb-3 font-semibold text-lg">{albumDetail?.title}</h4>
            {albumLoading ? (
              <div className="flex justify-center items-center bg-background h-52">
                <div className="border-4 border-primary border-t-transparent rounded-full w-16 h-16 animate-spin" />
              </div>
            ) : (
              <div className="gap-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                <Image.PreviewGroup>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {photos?.map((photo: any, index: number) => {
                    return (
                      <Image
                        key={index}
                        src={`/image${index % 2 === 0 ? 1 : 2}.jpg`}
                        alt={photo?.title}
                        width={200}
                        height={200}
                        className="rounded-lg object-center object-cover cursor-pointer"
                      />
                    );
                  })}
                </Image.PreviewGroup>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
