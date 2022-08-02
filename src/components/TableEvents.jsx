import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { Table, Card } from "react-bootstrap";
import { GlobalFilter } from "../components/GlobalFilter";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@tanstack/react-query";

function TableEvents() {
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2017-01-01"));
  const [endDate, setEndDate] = useState(new Date("2017-01-15"));
  const baseUrl = "https://gelatinous-crystalline-guppy.glitch.me/";
  const token = `${process.env.REACT_APP_API_KEY}/`;
  const dateUrl = `${moment(startDate).format("YYYY-MM-DD")}/${moment(
    endDate
  ).format("YYYY-MM-DD")}`;

  const {
    data: eventsapi,
    status: status1,
    error1,
  } = useQuery(["eventsHourlyTable", startDate, endDate], () =>
    axios
      .get(baseUrl + "/events/hourly/" + token + dateUrl)
      .then((res) => res.data)
  );
  const {
    data: poi,
    status: status2,
    error2,
  } = useQuery(["poi"], () =>
    axios.get(baseUrl + token + "poi").then((res) => res.data)
  );

  useEffect(() => {
    if (typeof eventsapi !== "undefined" && typeof poi !== "undefined") {
      console.log("risos1 ", eventsapi);
      console.log("risos2 ", poi);
      const auxEvents = [...eventsapi];
      console.log("aux events: ", auxEvents);
      auxEvents.map(
        (event) =>
          (event.poi = poi.find((point) => point.poi_id === event.poi)?.name)
      );
      setEvents(auxEvents);
    }
  }, [eventsapi, poi]);

  const eventsData = useMemo(() => [...events], [events]);

  const eventsColumns = useMemo(
    () =>
      events[0]
        ? Object.keys(events[0]).map((key) => {
            return { Header: key, accessor: key };
          })
        : [],
    [events]
  );

  const tableInstance = useTable(
    { columns: eventsColumns, data: eventsData },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  if (events && poi) {
    return (
      <Card className="shadow-lg p-0 p-lg-5 mx-auto">
        <h2 className="mx-auto mb-2 mt-2 mb-lg-4">Table - Hourly Events</h2>
        <div className="w-50 mx-auto mb-4">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Stack
              direction={{
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
              }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <DesktopDatePicker
                label="Start"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="End"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              {(typeof eventsapi === "undefined" ||
                typeof poi === "undefined") && (
                <div className="mx-auto ps-3">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
            </Stack>
          </LocalizationProvider>
        </div>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
        <div style={{ overflow: "scroll" }}>
          <Table
            {...getTableProps()}
            reponsive="true"
            striped
            hover
            size="sm bg-white"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="ps-3"
                    >
                      {capitalizeFirstLetter(column.render("Header"))}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
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
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto m-5">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default TableEvents;
