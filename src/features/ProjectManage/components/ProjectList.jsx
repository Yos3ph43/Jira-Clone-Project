import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Form, Input, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProject } from "../redux/action";

const ProjectList = () => {
  const project = useSelector((state) => state.project.allProject);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProject(""));
  }, []);
  console.log(project);
  const columns = [
    {
      title: "User ID",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Password",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "User Name",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      key: "soDT",
      dataIndex: "soDT",
    },
    {
      title: "User Type",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];
  //table body
  // const data = profile?.map((item) => {
  //   return {
  //     key: item?.taiKhoan,
  //     taiKhoan: <p>{item.taiKhoan}</p>,
  //     matKhau: <p>{item.matKhau}</p>,
  //     hoTen: <p>{item.hoTen}</p>,
  //     email: <p>{item.email}</p>,
  //     soDT: <p>{item.soDT}</p>,
  //     maLoaiNguoiDung: <p>{item.maLoaiNguoiDung}</p>,
  //     action: (
  //       <div key={item.taiKhoan}>
  //         <Space size="middle">
  //           <Link to={`/admin/userEdit/${item.taiKhoan}`}>
  //             <Button className="bg-sky-800 text-white border-white hover:border-sky-600 hover:text-sky-600 hover:bg-neutral-800">
  //               <EditFilled />
  //             </Button>
  //           </Link>

  //           <Button className="bg-red-800 text-white border-white hover:border-red-600 hover:text-red-600 hover:bg-neutral-800">
  //             <DeleteFilled onClick={() => {}} />
  //           </Button>
  //         </Space>
  //       </div>
  //     ),
  //   };
  // });

  //main render
  return (
    <div>
      <div className="my-5">
        {/* user search  */}
        <div>
          <Form
            name="basic"
            wrapperCol={{ span: 6 }}
            initialValues={{ remember: true }}
            // onFinish={}
            autoComplete="off"
          >
            <Form.Item
              name="tuKhoa"
              rules={[{ required: true, message: "Please input user name!" }]}
            >
              <Input />
            </Form.Item>
            {/* hidden  */}
            <Form.Item name="MaNhom" initialValue="GP00" hidden>
              <Input disabled />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button type="primary" danger onClick={() => {}}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* <Table columns={columns} dataSource={data} /> */}
    </div>
  );
};

export default ProjectList;
