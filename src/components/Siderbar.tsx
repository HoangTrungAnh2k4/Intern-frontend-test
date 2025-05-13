// app/components/Sidebar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path) ? "bg-blueBg text-blueText" : "";
  };

  return (
    <div className="w-[200px] min-w-[200px] max-w-[200px] sidebar">
      <a
        href={"/albums?pageSize=20&current=1"}
        className="flex items-center px-4 w-full h-[64px]"
      >
        <Image
          src="https://geekup.vn/Icons/geekup-logo-general.svg"
          alt="Geekup Logo"
          width={100}
          height={100}
        />
      </a>

      <ul className="flex flex-col gap-1 mx-1 pt-2">
        <Link
          href={"/albums"}
          className={`${isActive(
            "/albums"
          )}  inline-flex items-center  gap-3 rounded-md hover:rounded-md hover:bg-[#f0f0f0] pl-6 h-[40px]`}
        >
          <span
            role="img"
            aria-label="profile"
            className="anticon anticon-profile ant-menu-item-icon"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="profile"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0z"></path>
            </svg>
          </span>
          <span className="text-sm">Albums</span>
        </Link>
        <Link
          href={"/users"}
          className={`${isActive(
            "/users"
          )}  inline-flex items-center gap-3 rounded-md hover:rounded-md hover:bg-[#f0f0f0] pl-6 h-[40px]`}
        >
          <span
            role="img"
            aria-label="idcard"
            className="anticon anticon-idcard ant-menu-item-icon"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="idcard"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136V232h752v560zM610.3 476h123.4c1.3 0 2.3-3.6 2.3-8v-48c0-4.4-1-8-2.3-8H610.3c-1.3 0-2.3 3.6-2.3 8v48c0 4.4 1 8 2.3 8zm4.8 144h185.7c3.9 0 7.1-3.6 7.1-8v-48c0-4.4-3.2-8-7.1-8H615.1c-3.9 0-7.1 3.6-7.1 8v48c0 4.4 3.2 8 7.1 8zM224 673h43.9c4.2 0 7.6-3.3 7.9-7.5 3.8-50.5 46-90.5 97.2-90.5s93.4 40 97.2 90.5c.3 4.2 3.7 7.5 7.9 7.5H522a8 8 0 008-8.4c-2.8-53.3-32-99.7-74.6-126.1a111.8 111.8 0 0029.1-75.5c0-61.9-49.9-112-111.4-112s-111.4 50.1-111.4 112c0 29.1 11 55.5 29.1 75.5a158.09 158.09 0 00-74.6 126.1c-.4 4.6 3.2 8.4 7.8 8.4zm149-262c28.5 0 51.7 23.3 51.7 52s-23.2 52-51.7 52-51.7-23.3-51.7-52 23.2-52 51.7-52z"></path>
            </svg>
          </span>
          <span className="text-sm">Users</span>
        </Link>
      </ul>

      <div className="top-3 right-3 fixed bg-[#f7f7f7] shadow px-4 py-2 rounded-lg animate-bounce">
        Hoàng Trung Anh
      </div>
    </div>
  );
}
