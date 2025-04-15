import React from "react";
import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { views: totalviews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_VIEWS_QUERY, { id });

  // update the number of views whenever someone views
  //read docs after in nextjs
  // after is not a Dynamic API and calling it does not cause a route to become dynamic. If it's used within a static page, the callback will execute at build time, or whenever a page is revalidated.
  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ Views: totalviews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views: {totalviews}</span>
      </p>
    </div>
  );
};

export default View;
