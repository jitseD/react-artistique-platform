import { Form } from "react-router-dom";

const Save = () => {
    return (
        <section>
            <h1>Save</h1>
            <Form method="post" id="artwork-form">
                <label>
                    Title
                    <input
                        placeholder="title"
                        type="text"
                        name="title"
                    />
                </label>
                <label>
                    Description
                    <textarea
                        placeholder="description"
                        name="description"
                        rows={6}
                    />
                </label>
                <button type="submit">Save</button>
            </Form>
        </section>
    )
}


export default Save;