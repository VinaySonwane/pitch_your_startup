import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

// {
//   searchParams,
// }: {
//   searchParams: { query?: string };
// }) {
//   const query = searchParams.query;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  //console.log("id:", session?.id); //it was showing error 'session' is possibly 'null'.
  //so

  //fetching DAta
  //  const posts = await client.fetch(STARTUPS_QUERY); //get live data after refresh
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params }); //getting live data

  // console.log(JSON.stringify(posts, null, 2));

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch yout Startup <br /> Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Notices in Virtual Competition
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container  bg-white">
        <p className="text-30-semibold text-white">
          {query ? `search results for ${query}` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid bg-white">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
