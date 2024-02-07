import AuthLayout from "../features/auth/auth.layout";
import RegisterComponent from "../features/auth/components/registration.form.component";

const SignInPage = () => {
  return (
    <AuthLayout>
      <RegisterComponent />
    </AuthLayout>
  );
};

export default SignInPage;
