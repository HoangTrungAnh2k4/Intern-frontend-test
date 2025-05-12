"use client";

import { EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Image from "next/image";
import useSWR from "swr";

export default function Users() {
  //   const fetcher = (url) => fetch(url).then((res) => res.json());
  //   const { data, error, isLoading } = useSWR(`/api/user/`, fetcher);

  const dataSource = [
    {
      key: "1",
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
    },
    {
      key: "2",
      id: 2,

      name: "Ervin Howell",
      email: "Shanna@melissa.tv",
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
    },
    {
      key: "3",
      id: 3,

      name: "Clementine Bauch",
      email: "Nathan@yesenia.net",
      phone: "1-463-123-4447",
      website: "ramiro.info",
    },
    {
      key: "4",
      id: 4,

      name: "Patricia Lebsack",
      email: "Julianne.OConner@kory.org",
      phone: "493-170-9623 x156",
      website: "kale.biz",
    },
    {
      key: "5",
      id: 5,

      name: "Chelsey Dietrich",
      email: "Lucio_Hettinger@annie.ca",
      phone: "(254)954-1289",
      website: "demarco.info",
    },
    {
      key: "6",
      id: 6,

      name: "Mrs. Dennis Schulist",
      email: "Karley_Dach@jasper.info",
      phone: "1-477-935-8478 x6430",
      website: "ola.org",
    },
    {
      key: "7",
      id: 7,

      name: "Kurtis Weissnat",
      email: "Telly.Hoeger@billy.biz",
      phone: "210.067.6132",
      website: "elvis.io",
    },
    {
      key: "8",
      id: 8,

      name: "Nicholas Runolfsdottir V",
      email: "Sherwood@rosamond.me",
      phone: "586.493.6943 x140",
      website: "jacynthe.com",
    },
  ];

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
        const [first = "", last = ""] = text.toLowerCase().split(" "); // tách tên
        const avatarName = `${first}+${last}`; // nối bằng dấu cộng cho URL

        return (
          <Image
            src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${avatarName}`}
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
      render: (_, record) => (
        <div className="flex items-center px-[7px] border rounded-sm w-fit">
          <EyeOutlined />
          <span className="ml-2 text-sm">Show</span>
        </div>
      ),
    },
  ];
  return (
    <div className="">
      <header className="bg-white px-[24px] w-full h-[64px]"></header>
      <div className="bg-[#f5f5f5] p-6">
        <h4 className="mb-3 text-xl">Users</h4>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
}
