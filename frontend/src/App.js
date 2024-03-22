import React, { useState, useEffect } from "react";
// import ControlCard from "./Components/ControlCard";
import Top from "./Components/Top";
import { Card, CardContent, Input } from "@mui/joy";
import axios from "axios";
import _ from "lodash";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
// import Topbar from "./Components/Top";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const { control, handleSubmit } = useForm();

  const getAllUser = () => {
    setIsReady(false);
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`)
      .then((res) => {
        setUsers(res?.data?.rows);
        setIsReady(true);
        console.log("User ", res?.data?.rows);
      })
      .catch((error) => {
        console.error("Error", error?.message);
      });
  };
  const handleCreateUser = (data) => {
    console.log("data", data);
    setIsReady(false);
    axios
      .post(`${process.env.REACT_APP_API_URL}/user`, data)
      .then((res) => {
        axios.get(`${process.env.REACT_APP_API_URL}/user`).then((res) => {
          setUsers(res?.data?.rows);
          setIsReady(true);
        });
      })
      .catch((error) => {
        console.error("Error", error?.message);
      });
  };
  useEffect(() => {
    getAllUser();
    return () => {};
  }, []);

  const handleDeleteUser = (userId) => {
    axios
      .delete("http://localhost:3001/api/user/" + userId)
      .then((res) => {
        getAllUser();
      })
      .catch((error) => {
        alert(error?.message);
        console.error("Error", error?.message);
      });
  };

  if (!isReady) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className=" text-xl">
          <Top subtitle={"USER LIST"} />
        </div>
      </div>

      <div>
        <Card className="mx-40 my-8">
          <CardContent>
            <div>Search Box</div>
            <Input
              placeholder="Input Some Search Word"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
              You Search <span className="text-blue-500">{searchTerm}</span>
            </div>
          </CardContent>
        </Card>
        <div>
          <div className="lg:w-3/4 ">
            <div className="mx-40 font-semibold text-lg ">เพิ่มพนักงานใหม่</div>
            <Card className="mx-40 my-2">
              <CardContent>
                <form>
                  <div>ชื่อ</div>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="ชื่อพนักงาน" />
                    )}
                  />
                  <Controller
                    name="department"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="แผนก" />
                    )}
                  />
                </form>
              </CardContent>
            </Card>
          </div>
          <form onSubmit={handleSubmit(handleCreateUser)}>
            <div className="mx-40">
              <Button variant="contained" type="submit ">
                บันทึก
              </Button>
            </div>
          </form>
        </div>
        <div>
          <div>
            <h3 className="font-bold flex justify-center text-2xl">
              User List
            </h3>
            <Table>
              <thead>
                <tr className=" border border-black py-8">
                  <th>ลำดับที่</th>
                  <th>ชื่อ</th>
                  <th>แผนก</th>
                  <th>ดำเนินการ</th>
                </tr>
              </thead>
              {_.map(users, (eachUser, index) => (
                <tr className=" border border-black text-center  ">
                  <td className="py-3">{index + 1}</td>
                  <td>{eachUser?.name}</td>
                  <td>{eachUser?.department}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteUser(eachUser?._id)}
                    >
                      {" "}
                      ลบ
                    </Button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </div>

      <header class="App-header"></header>
    </div>
  );
}

export default App;
