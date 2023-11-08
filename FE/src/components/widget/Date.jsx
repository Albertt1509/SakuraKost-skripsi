import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        // Set interval untuk memperbarui tampilan setiap detik
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        // Membersihkan interval ketika komponen tidak lagi digunakan
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        const { date } = this.state;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', };

        return (
            <div>
                <p>{date.toLocaleDateString('id-ID', options)}</p>
            </div>
        );
    }
}

export default Clock;
