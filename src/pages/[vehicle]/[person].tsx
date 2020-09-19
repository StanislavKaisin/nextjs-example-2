import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { VehiclePerson } from "../../../api/VehiclePerson";

export interface PersonProps {
  ownersList?: VehiclePerson[];
}

export default function Person({ ownersList }: PersonProps) {
  const router = useRouter();
  // console.log("router", router);
  // console.log("router.query", router.query);
  const [owners, setOwner] = useState(ownersList);
  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        `http://localhost:4001/vehicles?ownerName=${router.query.person}&vehicle=${router.query.vehicle}`
      );
      const ownersList: VehiclePerson[] | undefined = await response.json();
      setOwner(ownersList);
    }
    if (ownersList?.length === 0) {
      loadData();
    }
  }, []);
  if (!owners?.[0]) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>
        {router.query.person}`s {router.query.vehicle}!
      </h1>
      <pre>{JSON.stringify(owners[0]?.details, null, 2)}</pre>
    </>
  );
}

interface MyNextPageContext extends NextPageContext {
  query: {
    person: string;
    vehicle: string;
  };
}

Person.getInitialProps = async ({ query, req }: MyNextPageContext) => {
  if (!req) {
    return { ownersList: [] };
  }
  // console.log("ctx=", ctx);
  // console.log("query=", query);
  const response = await fetch(
    `http://localhost:4001/vehicles?ownerName=${query.person}&vehicle=${query.vehicle}`
  );
  const ownersList: VehiclePerson[] | undefined = await response.json();
  return { ownersList };
};
