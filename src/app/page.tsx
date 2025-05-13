"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/albums?pageSize=20&current=1");
  }, [router]);

  return <div></div>;
}
