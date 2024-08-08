"use client";
import { getUrl } from "@/app/util/api";
import React from "react";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { url: string } }) => {
  const router = useRouter();

  React.useEffect(() => {
    const redirectTo = async () => {
      const data = await getUrl(params.url);

      if (data && data.url) {
        router.replace(data.url);
      } else {
        console.log("No existe el enlace");
        router.replace("/");
      }
    };

    redirectTo();
  }, [params.url]);
};

export default Page;
