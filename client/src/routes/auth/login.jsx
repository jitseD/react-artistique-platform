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
    let redirectTo = formData.get("redirectTo");
    return redirect(redirectTo || "/");
};

const Login = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || "/";

    let navigation = useNavigation();
    let isLoggingIn = navigation.formData?.get("email") != null;
    let actionData = useActionData();

    return (
        <main className="main--login">
            <div className="login__title">
                <h2>Log in</h2>
                <p>Get access to all the features</p>
            </div>
            <div className="login__form--wrapper">
                <Form method="post" className="login__form">
                    <input type="hidden" name="redirectTo" value={from} />
                    <div className="input__wrapper">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" autoComplete="email" defaultValue="tester@devine.be" />
                        <ErrorField data={actionData} field="email" />
                    </div>
                    <div className="input__wrapper">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" defaultValue="tester" />
                        <ErrorField data={actionData} field="password" />
                    </div>
                    <button type="submit" disabled={isLoggingIn} >
                        {isLoggingIn ? "Logging in..." : "Login"}
                    </button>
                </Form>
            </div>
        </main>
    );
};

Login.action = action;


export default Login;