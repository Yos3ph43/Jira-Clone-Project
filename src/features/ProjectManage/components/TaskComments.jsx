import React from "react";
import ReactQuill from "react-quill";
import { Avatar, Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import {
  addCommentAction,
  deleteCommentAction,
  editCommentAction,
  fetchTaskDetail,
} from "../redux/action";
import { useState } from "react";

const TaskComments = (props) => {
  const { taskId, comments } = props;
  const task = useSelector((state) => state.project.taskDetail);
  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = useState("");
  const openEditComment = (item) => {
    document.getElementById(`${item.id}`).style.display = "none";
    document.getElementById(`editform-${item.id}`).style.display = "block";
  };
  const closeEditComment = (item) => {
    document.getElementById(`${item.id}`).style.display = "block";
    document.getElementById(`editform-${item.id}`).style.display = "none";
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        <Form
          onFinish={async (value) => {
            await dispatch(addCommentAction(value));
            dispatch(fetchTaskDetail(taskId));
            setCommentContent("");
          }}
          fields={[
            { name: "taskId", value: taskId },
            { name: "contentComment", value: commentContent },
          ]}
        >
          <Form.Item name="taskId" className="hidden">
            <Input />
          </Form.Item>
          <Form.Item name="contentComment">
            <ReactQuill
              onChange={(input) => {
                setCommentContent(input);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {comments.length > 0 &&
          comments.map((item) => (
            <div key={item.id} className="flex mb-7">
              <div>
                <Avatar
                  src={item.avatar}
                  key={item.idUser}
                  className="w-12 h-auto mr-3"
                ></Avatar>
              </div>
              <div>
                <h4 className="m-0">{item.name}</h4>
                <p className="mb-3" id={`${item.id}`}>
                  {parse(item.commentContent)}
                </p>
                <div id={`editform-${item.id}`} style={{ display: "none" }}>
                  <Form
                    onFinish={async (value) => {
                      await dispatch(editCommentAction(value));
                      dispatch(fetchTaskDetail(taskId));
                      closeEditComment(item);
                    }}
                    fields={[
                      { name: "contentComment", value: item.commentContent },
                      { name: "id", value: item.id },
                    ]}
                  >
                    <Form.Item name="contentComment">
                      <ReactQuill />
                    </Form.Item>
                    <Form.Item name="id" className="hidden">
                      <Input />
                    </Form.Item>
                    <Button htmlType="submit">Submit</Button>
                    <Button
                      onClick={() => {
                        closeEditComment(item);
                      }}
                    >
                      Cancel
                    </Button>
                  </Form>
                </div>
                {/* Edit comment */}
                <span
                  className="cursor-pointer text-neutral-400 hover:text-neutral-800 mr-2"
                  onClick={() => {
                    openEditComment(item);
                  }}
                >
                  Edit
                </span>
                {/* Delete comment */}
                <span
                  className="cursor-pointer text-neutral-400 hover:text-neutral-800"
                  onClick={async () => {
                    await dispatch(deleteCommentAction(item.id));
                    dispatch(fetchTaskDetail(taskId));
                  }}
                >
                  Delete
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskComments;
