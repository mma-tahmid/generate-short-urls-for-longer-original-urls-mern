import React, { useState } from 'react'
import axios from "axios";

const AddUrlComponent = () => {
    const [url, setUrl] = useState("");


    const onSubmit = (e) => {
        e.preventDefault();

        if (!url) {
            alert("please enter something");
            return;
        }

         axios
            .post("/api/v5/urlss/create-short-url", { originalUrl: url })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });

        setUrl("")
    }
    //console.log(url)

    return (
        <div>
            <main>
                <section className="w-100 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="mb-2 fs-1">URL Shortener Service</h1>
                    <form className="w-50" onSubmit={onSubmit}>
                        <input
                            className="w-100 border border-primary p-2 mb-2 fs-3 h-25"
                            type="text"
                            placeholder="Enter the long Url"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button type="submit" className="btn btn-primary m-5">
                                Shorten the link
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default AddUrlComponent;