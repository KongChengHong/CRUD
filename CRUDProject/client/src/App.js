import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Axios from "axios";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";

import CompanyTable from "./CompanyTable";
import ContactPersonTable from "./ContactPersonTable";

function App() {
  const [companyList, setCompanyList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCompany, setEditCompany] = useState({});
  const [contactData, setContactData] = useState([]);

  const formRef = useRef(null);
  const contactPersonRef = useRef(null);

  const getCompanyList = () => {
    Axios.get("http://localhost:3001/api/get_all_company")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("api get fail");
        } else {
          setCompanyList(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCompanyDelete = (companyId) => {
    Axios.delete(`http://localhost:3001/api/delete/${companyId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("api delete fail");
        } else {
          setCompanyList(
            companyList.filter((company) => company.id !== companyId)
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCompanyEdit = (companyId) => {
    Axios.get(`http://localhost:3001/api/get_company/${companyId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("api post fail");
        } else {
          const company = res.data[0];
          setEditCompany(company);
          setContactData(JSON.parse(company.contactPerson));
          formRef.current.setFieldsValue(company);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    setIsEditMode(true);
  };

  const handleSubmit = (payload) => {
    const newCompany = {
      applicant: payload.applicant,
      companyName: payload.companyName,
      taxNumber: payload.taxNumber,
      responser: payload.responser,
      address: payload.address,
      tel: payload.tel,
      fax: payload.fax,
      note: payload.note,
      contactPerson: JSON.stringify(contactData),
    };

    if (isEditMode) {
      Axios.put(
        `http://localhost:3001/api/update/${editCompany.id}`,
        newCompany
      )
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("api post fail");
          } else {
            getCompanyList();
            setIsEditMode(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      Axios.post("http://localhost:3001/api/insert", newCompany)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("api post fail");
          } else {
            getCompanyList();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const validateContactData = () => {
    if (contactData.length > 0) {
      return contactData.every((el) => el?.name !== "" && el?.position !== "");
    } else {
      return false;
    }
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    contactPersonRef.current.reset();
    setContactData([]);
    setEditCompany({});
  };
  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        if (validateContactData()) {
          handleSubmit(values);
        } else {
          alert("?????????????????????????????????");
        }
      })
      .catch((err) => console.error(err));
  };

  const CompanyInfoForm = () => {
    return (
      <div>
        <Form ref={formRef} form={form} name="control-hooks">
          <div className="container">
            <div className="title">
              <h3>??????????????????</h3>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                padding: "10px",
              }}
            >
              <Form.Item
                style={{ width: "50%" }}
                name="applicant"
                label="?????????"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ width: "50%" }}
                name="companyName"
                label="????????????"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ width: "50%" }}
                name="taxNumber"
                label="????????????"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ width: "50%" }}
                name="responser"
                label="?????????"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                name="address"
                label="??????"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ width: "50%" }}
                name="tel"
                label="??????"
                rules={[{}]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ width: "50%" }}
                name="fax"
                label="??????"
                rules={[{}]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                name="note"
                label="??????"
                rules={[{}]}
              >
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    );
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  return (
    <div className="App">
      <div className="company-form">
        <div className="title">
          <h1>???????????????</h1>
        </div>
        <h3>??????????????? :</h3>
        <CompanyTable
          data={companyList}
          handleCompanyDelete={handleCompanyDelete}
          handleCompanyEdit={handleCompanyEdit}
        />
        <CompanyInfoForm />
        <ContactPersonTable
          ref={contactPersonRef}
          initialState={editCompany?.contactPerson}
          setContactData={setContactData}
        />
        <div className="submitButton-container">
          <Button htmlType="button" onClick={onFinish}>
            {isEditMode ? "??????" : "??????"}
          </Button>
          <Button htmlType="button" onClick={onReset}>
            ????????????
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
