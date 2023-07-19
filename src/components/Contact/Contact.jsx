import React, { useEffect, useState } from "react";
import "./Contact.scss";
import { Input, Form, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { SendMaill } from "../../store/action/HomeAction";

export function Contact() {
  const { Mail, error,  } = useSelector((state) => state.Mail);
  const dispatch = useDispatch();
  const [showElement, setShowElement] = useState(false);
  const [showErrorElement, setShowErrorElement] = useState(false);
  const [form] = Form.useForm();
  
  const {SendMail} = useSelector((state)=>state.SendMail);
  useEffect(() => {
    if (Mail?.succes) {
      setShowElement(true);
      setTimeout(() => {
        setShowElement(false);
      }, 5000);
    }

    if (error) {
      setShowErrorElement(true);
      setTimeout(() => {
        setShowErrorElement(false);
      }, 5000);
    }
  }, [Mail, error]);

  async function send(values) {
    dispatch(
      SendMaill({
        name: values.userName,
        email: values.email,
        text: values.textarea,
      })
    );

    form.resetFields();
  }

  return (
    <div className="contact">
      <div className="container_contact">
        <h1>{SendMail[0]?.title}</h1>
        <p>{SendMail[0]?.text}</p>

        <div className="inputs" id="inputs">
          <Form
            form={form}
            name="basic"
            autoComplete="off"
            onFinish={send}
          >
            <div className="top_input">
              <div>
                <label>{SendMail[1]?.title}</label>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Պարտադիր դաշտ" }]}
                >
                  <Input
                    type="email"
                    placeholder={SendMail[1]?.text}
                  />
                </Form.Item>
              </div>
              <div>
                <label>{SendMail[2]?.title}</label>
                <Form.Item
                  name="userName"
                  rules={[{ required: true, message: "Պարտադիր դաշտ" }]}
                >
                  <Input
                    type="text"
                    placeholder={SendMail[2]?.text}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="bottom_input">
              <label>{SendMail[3]?.title}</label>
              <Form.Item
                name="textarea"
                rules={[{ required: true, message: "Պարտադիր դաշտ" }]}
              >
                <TextArea
                  rows={8}
                  cols={8}
                  maxLength={130}
                  placeholder={SendMail[3]?.text}
                  className="textareaContact"
                />
              </Form.Item>
            </div>
            <Form.Item className="message_submit">
              <Button htmlType="submit">{SendMail[4]?.title}</Button>
            </Form.Item>

            {showElement && (
              <div className="resonseMessage">
                {SendMail[5]?.title}
                
              </div>
            )}
            {showErrorElement && (
              <div className="resonseMessage">
                 {SendMail[5]?.text}

              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}