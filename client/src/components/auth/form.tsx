import { Form, Input, Button, Typography, FormRule } from 'antd';
import styled from '@emotion/styled';

const { Title } = Typography;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  width: 300px;
`;

interface FormField {
  name: string;
  label: string;
  rules: FormRule[];
  inputType: 'text' | 'password' | 'email';
}

interface AuthFormProps {
  title: string;
  fields: FormField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish: (values: any) => void;
  submitButtonText: string;
}

const AuthForm = ({ title, fields, onFinish, submitButtonText }: AuthFormProps) => {
  const [form] = Form.useForm();

  return (
    <AuthContainer>
      <Title level={2} style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        {title}
      </Title>
      <StyledForm
        form={form}
        name="auth-form"
        onFinish={onFinish}
        layout="vertical"
        onSubmitCapture={(e) => e.preventDefault()}
      >
        {fields.map((field) => (
          <Form.Item key={field.name} name={field.name} rules={field.rules}>
            {field.inputType === 'password' ? (
              <Input.Password placeholder={field.label} />
            ) : (
              <Input type={field.inputType} placeholder={field.label} />
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {submitButtonText}
          </Button>
        </Form.Item>
      </StyledForm>
    </AuthContainer>
  );
};

export default AuthForm;
