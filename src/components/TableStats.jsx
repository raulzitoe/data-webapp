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

function TableStats() {
  const [stats, setStats] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2017-01-01"));
  const [endDate, setEndDate] = useState(new Date("2017-01-15"));
  const baseUrl = "https://gelatinous-crystalline-guppy.glitch.me/";
  const token = `${process.env.REACT_APP_API_KEY}/`;
  const dateUrl = `${moment(startDate).format("YYYY-MM-DD")}/${moment(
    endDate
  ).format("YYYY-MM-DD")}`;

  const {
    data: statsapi,
    status: status1,
    error1,
  } = useQuery(["statsHourly", startDate, endDate], () =>
    axios
      .get(baseUrl + "/stats/hourly/" + token + dateUrl)
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
    if (typeof statsapi !== "undefined" && typeof poi !== "undefined") {
      const auxStats = [...statsapi];
      auxStats.map(
        (stat) =>
          (stat.poi = poi.find((point) => point.poi_id === stat.poi)?.name)
      );
      console.log("auxStats: ", auxStats);
      setStats(auxStats);
    }
  }, [statsapi, poi]);

  const statsData = useMemo(() => [...stats], [stats]);

  const statsColumns = useMemo(
    () =>
      stats[0]
        ? Object.keys(stats[0]).map((key) => {
            return { Header: key, accessor: key };
          })
        : [],
    [stats]
  );

  const tableInstance = useTable(
    { columns: statsColumns, data: statsData },
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

  if (stats && poi) {
    return (
      <Card className="shadow-lg p-0 p-lg-5 mx-auto">
        <h2 className="mx-auto mb-2 mt-2 mb-lg-4">Table - Hourly Statistics</h2>
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
              {(typeof statsapi === "undefined" ||
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
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
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
      </Card>
    );
  }

  return (
    <div className="mx-auto m-5">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default TableStats;
