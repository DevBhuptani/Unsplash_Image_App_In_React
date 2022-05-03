import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

class Test extends React.Component {
    render(){
        return (
            <Image src={this.props.src} alt="Images" className="p-2"/>
        );
    }
}

export default Test;