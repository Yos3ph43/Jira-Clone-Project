import {
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Popover,
  Select,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  assignUserAction,
  deleteProject,
  fetchAllProject,
  fetchProjectDetail,
  fetchSearchUser,
  updateProjectDetail,
} from "../redux/action";
import ReactQuill from "react-quill";
import ProjectListMembers from "./ProjectListMembers";

const ProjectList = () => {
  const project = useSelector((state) => state.project.allProject);
  const user = useSelector((state) => state.user.profile);
  const searchUser = useSelector((state) => state.project.searchUser);
  const projectDetail = useSelector((state) => state.project.projectDetail);
  const dispatch = useDispatch();
  // const [selectedItem, setSelectedItem] = useState("");
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    dispatch(fetchAllProject());
  }, [current]);
  //search user value
  const [value, setValue] = useState("");
  //popover
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  //modal
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => {
    setOpenModal(true);
  };

  const columns = [
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Members",
      key: "members",
      dataIndex: "members",
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];
  //table body
  const data = project?.map((item) => {
    return {
      key: item.id,
      projectId: <p>{item.id}</p>,
      projectName: (
        <div>
          <Link to={`/detail/${item.id}`}>{item.projectName}</Link>
        </div>
      ),
      creator: <p>{item.creator.name}</p>,
      category: <p>{item.categoryName}</p>,
      members: (
        <>
          <Avatar.Group>
            <Popover
              title="List of members"
              placement="bottom"
              className="hover:cursor-pointer"
              key={item.id}
              content={
                <>
                  <ProjectListMembers
                    members={item.members}
                    projectId={item.id}
                  />
                </>
              }
              trigger="click"
              open={open}
              onOpenChange={() => {
                handleOpenChange();
              }}
            >
              {item.members?.map((member) => {
                return (
                  <Avatar
                    src={member.avatar}
                    key={member.userId}
                    style={{
                      backgroundColor: "red",
                    }}
                  ></Avatar>
                );
              })}
            </Popover>
          </Avatar.Group>

          <Avatar>
            <Popover
              placement="bottom"
              key={item.id}
              content={
                <>
                  <Space>
                    {/* <Input
                    // onChange={}
                    /> */}
                    <AutoComplete
                      className="w-56"
                      onSearch={(value) => {
                        dispatch(fetchSearchUser(value));
                      }}
                      options={
                        searchUser &&
                        searchUser.map((user) => ({
                          label: `${user.name} (ID: ${user.userId})`,
                          value: `${user.userId}`,
                        }))
                      }
                      value={value}
                      onSelect={(value, option) => {
                        setValue(option.label);

                        dispatch(
                          assignUserAction({
                            projectId: item.id,
                            userId: option.value,
                          })
                        );
                        dispatch(fetchAllProject());
                        hide();
                        setValue("");
                      }}
                      onChange={(txt) => {
                        setValue(txt);
                      }}
                    />

                    <Button
                      danger
                      onClick={() => {
                        hide();
                        setValue("");
                      }}
                    >
                      Cancel
                    </Button>
                    {/* <Button type="primary">Add</Button> */}
                  </Space>
                </>
              }
              trigger="click"
              open={open}
              onOpenChange={() => {
                handleOpenChange();
              }}
            >
              <PlusCircleOutlined />
            </Popover>
          </Avatar>
        </>
      ),
      action: (
        <div key={item.id}>
          <Space size="middle">
            <Button
              onClick={() => {
                showModal();
                dispatch(fetchProjectDetail(item.id));
              }}
              className="bg-sky-800 text-white border-white hover:border-sky-600 hover:text-sky-600 hover:bg-neutral-800"
            >
              <EditFilled />
            </Button>

            <Button
              className="bg-red-800 text-white border-white hover:border-red-600 hover:text-red-600 hover:bg-neutral-800"
              onClick={async () => {
                if (window.confirm("Xác nhận xóa?")) {
                  await dispatch(deleteProject(item.id));
                  dispatch(fetchAllProject());
                }
              }}
            >
              <DeleteFilled />
            </Button>
          </Space>
        </div>
      ),
    };
  });
  //main render
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Modal
        width="40rem"
        title="Project Edit"
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancel
          </Button>,
        ]}
      >
        <Form
          onFinish={(value) => {
            if (user.id === projectDetail.creator.id) {
              return (
                dispatch(updateProjectDetail(value.id, value)),
                dispatch(fetchAllProject()),
                setCurrent(current + 1),
                alert("Cập nhật project thành công"),
                setOpenModal(false)
              );
            }
            alert("Chỉ chủ project mới có thể thay đổi");
          }}
          // initialValues={{
          //   remember: true,
          // }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
            padding: "1rem 1rem 0 1rem",
          }}
          fields={[
            {
              name: "id",
              value: projectDetail?.id,
            },

            {
              name: "projectName",
              value: projectDetail?.projectName,
            },

            {
              name: "description",
              value: projectDetail?.description,
            },
            {
              name: "categoryId",
              value: `${projectDetail?.projectCategory.id}`,
            },
            {
              name: "creator",
              value: projectDetail?.creator.id,
            },
          ]}
        >
          <Form.Item
            initialValue={projectDetail?.id}
            name="id"
            label="Project ID"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="projectName"
            rules={[
              {
                required: true,
              },
            ]}
            label="Project Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={projectDetail?.description}
            label="Description"
            name="description"
          >
            <ReactQuill />
          </Form.Item>

          <Form.Item
            label="Project Category"
            name="categoryId"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              defaultValue={projectDetail?.projectCategory.id}
              direction="bottom"
              style={{
                width: 240,
              }}
              options={[
                {
                  label: "Software",
                  value: "2",
                },
                {
                  label: "Web Application",
                  value: "1",
                },
                {
                  label: "Mobile Application",
                  value: "3",
                },
              ]}
            />
          </Form.Item>
          {/* hidden  */}
          <Form.Item
            hidden
            initialValue={projectDetail?.creator.id}
            name="creator"
            label="creator"
          >
            <Input disabled value={projectDetail?.creator.id} />
          </Form.Item>
          {/* hidden  */}
          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
            style={{ margin: "3rem 0" }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectList;
