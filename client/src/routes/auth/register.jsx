import {
    Form,
    redirect,
    useActionData,
    useLocation,
    useNavigation,
} from "react-router-dom";
import ErrorField from "../../components/ErrorField";
import { register } from "../../services/auth";

const action = async ({ request }) => {
    const formData = await request.formData();
    const { email, password, username } = Object.fromEntries(formData);

    if (!username) return { error: { username: "You must provide a username" }, };
    if (!email) return { error: { email: "You must provide a email to sign up" }, };
    if (!password) return { error: { password: "You must provide a password" }, };

    try {
        await register(username, password, email);
    } catch (error) {
        return {
            error: { general: error.message },
        };
    }

    let redirectTo = formData.get("redirectTo") | null;
    return redirect(redirectTo || `${import.meta.env.BASE_URL}/`);
};

const Register = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || `${import.meta.env.BASE_URL}/`;

    let navigation = useNavigation();
    let isLoggingIn = navigation.formData?.get("email") != null;

    let actionData = useActionData();

    return (
        <main className="main--register">
            <div className="register__title">
                <h2>Sign up</h2>
                <p>Get access to all the features</p>
            </div>
            <div className="register__form--wrapper">
                <Form method="post" className="register__form">
                    <input type="hidden" name="redirectTo" value={from} />
                    <div className="input__wrapper">
                        <label htmlFor="email">Username</label>
                        <input id="username" name="username" type="text" autoComplete="username" />
                        <ErrorField data={actionData} field="username" />
                    </div>
                    <div className="input__wrapper">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" autoComplete="email" />
                        <ErrorField data={actionData} field="email" />
                    </div>
                    <div className="input__wrapper">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" />
                        <ErrorField data={actionData} field="password" />
                    </div>
                    <ErrorField data={actionData} field="general" />
                    <button type="submit" disabled={isLoggingIn} >
                        {isLoggingIn ? "Sending..." : "Sign up"}
                    </button>
                </Form>
            </div>
        </main>
    )
}

Register.action = action;

export default Register;
