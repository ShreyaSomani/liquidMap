import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class ViewMapVersion extends Component {

  constructor(props) {
    super(props)

    // State
    this.state = {
      version: '',
      metadata: '',
      contributor: '',
      href: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/liquidmaps/get-map-version/' + this.props.match.params.id + '/' + this.props.match.params.vid)
      .then(res => {
        const obj = JSON.parse(res.data.metadata)
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
        
        var prettyData = JSON.stringify(obj, undefined, 4);

        this.setState({
          metadata: prettyData,
          href: "data:"+data,
          version: res.data.version,
          contributor: res.data.contributor
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
        <>
            <h1>{this.state.version}</h1>
            <Button marginLeft={'auto'} href={this.state.href} download={this.state.version + '.json'} size="sm" variant="info">
                Download
            </Button>
            <textarea cols={100} rows={20} value={this.state.metadata} disabled="true" />
        </>
    );
  }
}