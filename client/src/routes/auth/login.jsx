import { Form, redirect, useNavigation, useActionData, useLocation } from "react-router-dom";
import { authenticate } from "../../services/auth";
import ErrorField from "../../components/ErrorField";

const action = async ({ request }) => {
    const formData = await request.formData();
    const { email, password } = Object.fromEntries(formData);

    if (!email) return { error: { email: "You must provide a email to log in" }, };
    if (!password) return { error: { password: "You must provide a password to log in" }, };

    try {
        await authenticate(email, password);
    } catch (error) {
        return {
            error: { general: error.message },
        };
    }
    let redirectTo = formData.get("redirectTo") | null;
    console.log(redirectTo);
    return redirect(redirectTo || "/");
};

const Login = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || "/";

    console.log(from);

    let navigation = useNavigation();
    let isLoggingIn = navigation.formData?.get("email") != null;

    let actionData = useActionData();

    return (
        <section>
            <hgroup>
                <h2>Sign in</h2>
                <p>Get access to all the features</p>
            </hgroup>
            <Form method="post">
                <input type="hidden" name="redirectTo" value={from} />
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="e-mail"
                        autoComplete="email"
                        defaultValue="tester@devine.be"
                    />
                    <ErrorField data={actionData} field="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        defaultValue="tester"
                    />
                    <ErrorField data={actionData} field="password" />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? "Logging in..." : "Login"}
                    </button>                </div>
            </Form>
        </section>
    );
};

Login.action = action;


export default Login;