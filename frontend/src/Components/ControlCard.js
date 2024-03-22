import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ControlCard({ title }) {
  // const alertStart = () => {
  //   window.alert("คุณกำลังกด Start " + title);
  // };
  // const alertRestart = () => {
  //   window.alert("คุณกำลังกด Restart " + title);
  // };
  // const alertDown = () => {
  //   window.alert("คุณกำลังกด Down " + title);
  // };

  function showData() {
    return (
      <div>
        <li>Hello</li>
        <li>World</li>
      </div>
    );
  }
  return (
    <div>
      <div>{title}</div>
      <Stack direction="row" spacing={2}>
        <Button color="secondary">Restart</Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
        <Button variant="contained" color="success">
          Success
        </Button>
      </Stack>
      {showData()}
    </div>
  );
}
