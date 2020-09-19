import Link from "next/link";
import { useState, useEffect } from "react";
import { VehiclePerson } from "../../api/VehiclePerson";

// const people = [
//   { v: "car", name: "bruno" },
//   { v: "bike", name: "john" },
//   { v: "plane", name: "mike" },
// ];

export interface ListProps {
  ownersList: VehiclePerson[] | undefined;
}

export default function List({ ownersList }: ListProps) {
  // console.log("{ ownersList }", ownersList);
  const owners = ownersList;
  // const [owners, setOwners] = useState([]);
  // useEffect(() => {
  //   async function loadData() {
  //     const response = await fetch(`http://localhost:4001/vehicles`);
  //     const ownersList = await response.json();
  //     setOwners(ownersList);
  //   }
  //   loadData();
  // }, []);

  return (
    <>
      {/* {ownersList?.[0].details} */}
      <h1>Hello from List page!</h1>
      {ownersList?.map((element, index) => {
        return (
          <div key={index}>
            <Link
              href="/[vehicle]/[person]"
              as={`/${element.vehicle}/${element.ownerName}`}
            >
              <a>
                Navigate to {element.ownerName}`s {element.vehicle}
              </a>
            </Link>
            <br />
          </div>
        );
      })}
    </>
  );
}
List.getInitialProps = async () => {
  const response = await fetch(`http://localhost:4001/vehicles`);
  const ownersList: VehiclePerson | undefined = await response.json();
  return { ownersList };
};
