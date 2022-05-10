import qnote from './Quarter_note_with_upwards_stem.svg';
import gclef from './GClef.svg'
import fclef from './F-Clef.svg'
import React from "react";
import "./Sheet.css";


export default class Sheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: this.props.notePos
        }
    }
    handleHover(i) {
        this.setState({
            pos: i
        })
    }

    renderBand(i, hasLine) {
        let oh, oc = null;
        if (this.props.interact) {
            oh = ()=>{this.handleHover(i)};
            oc = (j)=>{this.props.handleClick(j)};
        }
        return (
            <Band
                note={i}
                drawLine={hasLine}
                pos={this.props.notePos}
                onHover={oh}
                onClick={oc}
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderBand(26, false)}
                {this.renderBand(25, false)}
                {this.renderBand(24, false)}
                {this.renderBand(23, false)}
                {this.renderBand(22, false)}
                {this.renderBand(21, false)}
                {this.renderBand(20, false)}
                {this.renderBand(19, false)}
                {this.renderBand(18, false)}

                {this.renderBand(17, true)}
                {this.renderBand(16, true)}
                {this.renderBand(15, true)}
                {this.renderBand(14, true)}
                {this.renderBand(13, true)}
                {this.renderBand(12, true)}
                {this.renderBand(11, true)}
                {this.renderBand(10, true)}
                {this.renderBand(9, true)}

                {this.renderBand(8, false)}
                {this.renderBand(7, false)}
                {this.renderBand(6, false)}
                {this.renderBand(5, false)}
                {this.renderBand(4, false)}
                {this.renderBand(3, false)}
                {this.renderBand(2, false)}
                {this.renderBand(1, false)}
                {this.renderBand(0, false)}
            </div>
        );
    }
}
/*
function Band(props) {
    return (
        <div class="band" onClick={props.onClick}>
            {props.line === true && <div className="line"></div>}
            {props.pos === props.note && <img src={qnote} className="note"></img>}
        </div>
    );
}*/

class Band extends React.Component {
    render() {
        let n;
        if (this.props.pos === this.props.note) {
            n = this.props.note > 12 ? <img src={qnote} class="upperNote"/> : <img src={qnote} class="lowerNote"/>;
        }
        let l;
        if (this.props.note % 2 == 1) {
            if (this.props.drawLine) {
                l = <div className="line"></div>;
            } else if (this.props.note > 12 && this.props.pos >= this.props.note) {
                l = <div className="ledgerLine"></div>;
            } else if (this.props.note < 12 && this.props.pos <= this.props.note) {
                l = <div className="ledgerLine"></div>;
            }
        }
        return (
            <div className="band" onClick={()=>this.props.onClick(this.props.pos)} onMouseOver={this.props.onHover}>
                {l}
                {n}
            </div>
        );
    }
}