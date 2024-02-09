import AuthLayout from "../features/auth/components/auth.layout";
import RegisterComponent from "../features/auth/components/registration.form.component";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterComponent />
    </AuthLayout>
  );
};

export default RegisterPage;
