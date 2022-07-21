import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { TextField } from "@mui/material";

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
       <TextField id="outlined-basic" label="Search" variant="outlined" className="w-50 mx-auto mb-lg-4" value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}/>
  );
}