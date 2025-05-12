export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <header className="bg-white px-[24px] w-full h-[64px]"></header>
      <div className="bg-[#f5f5f5] p-6">{children}</div>
    </div>
  );
}
