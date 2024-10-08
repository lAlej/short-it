"use client";
import { getUrl } from "@/app/util/api";
import React from "react";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { url: string } }) => {
  const router = useRouter();

  React.useEffect(() => {
    const redirectTo = async () => {
      try {
        const data = await getUrl(params.url);

        router.replace(data.url);
      } catch (error) {
        router.replace("/");
      }
    };

    redirectTo();
  }, [params.url]);
};

export default Page;
