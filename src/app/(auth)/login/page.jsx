import { auth } from "@/lib/auth";
import { handleGithubLogin } from "@/lib/actions";

const LoginPage = async () => {
  const session = await auth();

  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with Github</button>
      </form>
    </div>
  );
};

export default LoginPage;
