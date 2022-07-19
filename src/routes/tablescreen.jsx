import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";

export default function TableScreen(props) {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const response = await axios
      .get("https://gelatinous-crystalline-guppy.glitch.me/events/hourly")
      .catch((err) => console.log(err));

    if (response) {
      const events = response.data;

      console.log("Events: ", events);
      setEvents(events);
    }
  };

  const data = useMemo(
    () => [
      {
        date: "may 11",
        events: "44",
        hour: "12"
      },
      {
        date: "may 11",
        events: "44",
        hour: "12"
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date", // accessor is the "key" in the data
      },
      {
        Header: "Events",
        accessor: "events",
      },
      {
        Header: "Hour",
        accessor: "hour",
      },
    ],
    []
  );

  const eventsData = useMemo(() => [...events], [events]);
  
  const eventsColumns = useMemo(
    () =>
      events[0]
        ? Object.keys(events[0])
            .map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [events]
  );
  console.log(events);

  const tableInstance = useTable({ columns: eventsColumns, data: eventsData });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

    useEffect(() => {
      fetchEvents();
    }, []);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Table Screen</h2>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
