import React from "react";
import Sheet from "./sheet/Sheet";
import './Game.css';

const scale = ['A','B','C','D','E','F','G']

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highest: 0,
            score: 0,
            answer: this.randomNote(-1),
            mode: false,
            isGClef: false
        }
    }

    randomNote(j) {
        let i = Math.floor(Math.random() * 27);
        return  i !== j ? i : this.randomNote();
    }

    getNote(i) {
        let j = this.state.isGClef ? 2 : 4;
        return scale[(i+j) % 7];
    }

    submitAnswer(ans) {
        if (ans === this.getNote(this.state.answer)) {
            this.setState({
                score: this.state.score+1,
                answer: this.randomNote(this.state.answer)
            })
            console.log("state set.")
        } else {
            this.setState({
                highest: Math.max(this.state.score, this.state.highest),
                score: 0
            })
        }
    }


    render() {
        let handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                this.submitAnswer(event.target.value);
                event.target.value = "";
            }
        };
        console.log("render executed")
        let mode = this.state.mode ?
            <div class="sheetInput">
                answer: {this.getNote(this.state.answer)}
                <Sheet interact={true} isGClef={this.state.isGClef} notePos={-1} handleClick={(i) => this.submitAnswer(this.getNote(i))}/>
            </div> :
            <div class="sheetOutput">
                <Sheet interact={false} isGClef={this.state.isGClef} notePos={this.state.answer}/>
                <input type="text" name="note" onKeyPress={(ev)=>handleKeyPress(ev)}/>
            </div>;
        return (
            <div>
                high score: {this.state.highest},
                score: {this.state.score}
                {mode}
            </div>
        );
    }
}