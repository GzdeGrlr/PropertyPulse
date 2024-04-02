"use client";
import React from "react";
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";
const PropertyPage = () => {
  const router = useRouter();
  const { id } = useParams(); // get the id from the url
  const searchParams = useSearchParams(); // get the search params like ?name=foo
  const name = searchParams.get("name");
  const pathname = usePathname();
  return (
    <div>
      <button onClick={() => router.push("/")} className="bg-blue-500 p-2">
        {" "}
        Go Home {pathname} {id}
      </button>
    </div>
  );
};

export default PropertyPage;
