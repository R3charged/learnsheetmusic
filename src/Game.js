import React from "react";
import Sheet from "./sheet/Sheet";
import './Game.css';

const right = ['C','D','E','F','G','A','B','C','D','E','F','G','A','B','C','D','E','F','G','A','B','C','D','E','F','G','A']

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            score: 5,
            answer: this.randomNote(),
            mode: false
        }
    }

    randomNote() {
        return Math.floor(Math.random() * 27);
    }

    submitAnswer(ans) {
        if (ans == right[this.state.answer]) {
            this.setState({
                score: this.state.score+1,
                answer: this.randomNote()
            })
            console.log("state set.")
        } else {
            this.setState({
                score: 0
            })
        }
    }


    render() {
        console.log("render executed")
        let mode = this.state.mode ?
            <div class="sheet">
                answer: {right[this.state.answer]}
                <Sheet interact={true} handleClick={(i) => this.submitAnswer(right[i])}/>
            </div> :
            <div class="sheet">
                <Sheet interact={false} textBox={true} notePos={this.state.answer} handleClick={(i) => this.submitAnswer(i)}/>

            </div>;
        return (
            <div>
                score: {this.state.score}
                {mode}
            </div>
        );
    }
}