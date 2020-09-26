import { NextPageContext } from "next";
// import Router from "next/router";
import { myGet } from "../../api/myGet";
// import people from "./api/people";

export default function People({ people }: any) {
  return (
    <div>
      <h1>hello from people</h1>
      <p>{JSON.stringify(people, null, 2)}</p>
    </div>
  );
}

People.getInitialProps = async (ctx: NextPageContext) => {
  // const cookie = ctx.req?.headers.cookie;

  // const resp = await fetch(`http://localhost:3000/api/people`, {
  //   headers: { cookie: cookie! },
  // });
  // if (resp.status === 401 && !ctx.req) {
  //   Router.replace("/login");
  //   return {};
  // }
  // if (resp.status === 401 && ctx.req) {
  //   ctx.res?.writeHead(302, { location: `http://localhost:3000/login` });
  //   ctx.res?.end();
  //   return;
  // }
  // const json = await resp.json();
  // return { people: json };

  const json = await myGet(`http://localhost:3000/api/people`, ctx);
  return { people: json };
};
