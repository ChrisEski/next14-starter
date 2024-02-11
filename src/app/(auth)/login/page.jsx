import { auth } from "@/lib/auth";
import { handleGithubLogin } from "@/lib/actions";

const LoginPage = async () => {
  const session = await auth();

  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with Github</button>
      </form>
      <form>
        <input
          type="text"
          placeholder="username"
          name="username"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
        />
        <button>Login with credentials</button>
      </form>
    </div>
  );
};

export default LoginPage;
