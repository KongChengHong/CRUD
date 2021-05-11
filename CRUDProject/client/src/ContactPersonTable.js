import React, { useState, useEffect, useImperativeHandle } from "react";
import { Input, Table, Button } from "antd";
import clonedeep from "lodash.clonedeep";

const ContactPersonTable = React.forwardRef((props, ref) => {
  const { initialState, setContactData } = props;

  const [data, setData] = useState([
    { name: "", position: "", phone: "", email: "" },
    { name: "", position: "", phone: "", email: "" },
    { name: "", position: "", phone: "", email: "" },
  ]);

  const resetData = () => {
    setData([
      { name: "", position: "", phone: "", email: "" },
      { name: "", position: "", phone: "", email: "" },
      { name: "", position: "", phone: "", email: "" },
    ]);
  };
  const initContactItem = {
    name: "",
    position: "",
    phone: "",
    email: "",
  };

  const handleFieldChange = (value, field, index) => {
    const _data = clonedeep(data);
    _data[index][field] = value;
    setData(_data);
    setContactData(_data);
  };

  const columns = [
    {
      title: "*姓名",
      dataIndex: "name",
      key: "1",
      render: (text, record, index) => (
        <Input
          key={"random1"}
          value={text}
          onChange={(e) => {
            handleFieldChange(e.target.value, "name", index);
          }}
        ></Input>
      ),
    },
    {
      title: "*職稱",
      dataIndex: "position",
      key: "2",
      render: (text, record, index) => (
        <Input
          key={index}
          value={text}
          onChange={(e) => {
            handleFieldChange(e.target.value, "position", index);
          }}
        ></Input>
      ),
    },
    {
      title: "電話",
      dataIndex: "phone",
      key: "3",
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) => {
            handleFieldChange(e.target.value, "phone", index);
          }}
        ></Input>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "4",
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) => {
            handleFieldChange(e.target.value, "email", index);
          }}
        ></Input>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "5",
      render: (text, record, index) =>
        index === data.length - 1 ? (
          <Button
            htmlType="button"
            onClick={() => setData([...data, initContactItem])}
          >
            +
          </Button>
        ) : (
          <Button
            htmlType="button"
            onClick={() => {
              const _data = data.filter((_, elIndex) => elIndex !== index);
              setData(_data);
            }}
          >
            -
          </Button>
        ),
    },
  ];

  useImperativeHandle(ref, () => ({
    reset: resetData,
  }));

  useEffect(() => {
    if (initialState) {
      setData(JSON.parse(initialState));
    } else {
      resetData();
    }
  }, [initialState]);

  return (
    <div className="container">
      <div className="title">
        <h3>聯絡人</h3>
      </div>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        pagination={false}
      />
    </div>
  );
});

export default ContactPersonTable;
