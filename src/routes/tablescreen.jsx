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

export default function TableScreen() {
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2017-01-01"));
  const [endDate, setEndDate] = useState(new Date("2017-01-15"));
  const [poi, setPoi] = useState([]);

  useEffect(() => {
    const fetchPoi = async () => {
      const response = await axios
        .get("https://gelatinous-crystalline-guppy.glitch.me/poi")
        .catch((err) => console.log(err));
  
      if (response) {
        const poi = response.data;
  
        console.log("Poi: ", poi);
        setPoi(poi);
      }
    };
    fetchPoi();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios
        .get(
          `https://gelatinous-crystalline-guppy.glitch.me/events/hourly/${moment(
            startDate
          ).format("YYYY-MM-DD")}/${moment(endDate).format("YYYY-MM-DD")}`
        )
        .catch((err) => console.log(err));
  
      if (response) {
        const events2 = response.data;
        events2.map((x)=>(x.poi_id = poi.find((y) => y.poi_id === x.poi_id)?.name    ));
        setEvents(events2);
  
        console.log("Events: ", events2);
      }
    };
    fetchEvents();
  }, [startDate, endDate, poi]);

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
      <div className="bg-primary pt-5 pb-5 p-lg-5">
        <Card className="shadow-lg p-0 p-lg-5 mx-auto">
          <h2 className="mx-auto mb-2 mt-2 mb-lg-4">Table Screen</h2>
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
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto m-5">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
