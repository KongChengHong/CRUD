import { Table, Popconfirm, Button } from "antd";

const CompanyTable = (props) => {
  const { data, handleCompanyDelete, handleCompanyEdit } = props;

  const columns = [
    {
      title: "公司名稱",
      dataIndex: "companyName",
      render: (text, record) => (
        <Button type="link" onClick={() => handleCompanyEdit(record.id)}>
          {text}
        </Button>
      ),
    },
    { title: "統一編號", dataIndex: "taxNumber" },
    { title: "電話", dataIndex: "tel" },
    { title: "填單人", dataIndex: "applicant" },
    { title: "更新時間", dataIndex: "updateTime" },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleCompanyDelete(record.id)}
        >
          <button>Delete</button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        bordered
        size="middle"
      />
    </div>
  );
};

export default CompanyTable;
