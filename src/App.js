import React, { Component, Fragment } from "react";

import Results from "./Results";
import Form from "./Form";

export default class App extends Component {
    state = {
        response: []
    };

    getLogs = rid => {
        const URL = `http://localhost:9200/api/logs?rid=${rid}`;
        fetch(URL)
            .then(res => {
                if (res.status !== 200) {
                    this.setState({response: {error: "not found"}});
                    throw new Error("Error while fetching getLogs. Response status: " + res.status);
                }
                return res.json();
            })
            .then(json => {
                this.setState({ response: json });
            });
    };

    render() {
        return (
            <Fragment>
                <Form search={this.getLogs} />
                <Results response={this.state.response} />
            </Fragment>
        );
    }
}
