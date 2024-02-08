import AuthLayout from "../features/auth/auth.layout";
import SignInComponent from "../features/auth/components/signin.form.component";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignInComponent />
    </AuthLayout>
  );
};

export default SignInPage;
