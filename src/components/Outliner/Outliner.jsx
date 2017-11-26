import React from "react";
import data from "./data";
//import { render } from "react-dom";
import Hypertopic from 'hypertopic';
import conf from '../../config/config.json';

import '../../styles/App.css';
//mettre en state DONE
//terme en anglais DONE
//fetch hypertopic PRESQUE
//intégrer src (fork/clone)
//gérer URI (en pointant)
//route utiliser ee app dans src
//mettre en 2eme ligne /viewpoint/:id
//component Outliner
//mettre en formulaire (<input>)
//modifier feuille de style

class Outliner extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    let tree = this._getTree();
    return (
      <div>
        <h1> TEST </h1>
          <ul>
            {tree}
          </ul>
      </div>
    );
  }
//<Tree father={this.state.fathers.upper} data={this.state}  />
  componentWillMount() {
    this._fetchData();
  }

  componentDidMount() {
  }

  _getTree() {
      return <Tree father={Object.keys(this.state.fathers)}   />
  }

  _fetchData() {

        const db = new Hypertopic(conf.services);

        var listFatherGroup = {};

        db.get({ _id: this.props.match.params.id })
          .then(x => {this.setState({topics : x.topics});
                return x.topics})
          .then(x => {
            let listFather = Object.keys(x).map(
              k =>
                (k = x[k].broader.length < 1 ? { upper: [k] } : { [x[k].broader]: [k] })
            );
            listFather.forEach(
              e =>
                typeof listFatherGroup[Object.keys(e)] === "undefined"
                  ? (listFatherGroup[Object.keys(e)] = Object.values(e)[0])
                  : (listFatherGroup[Object.keys(e)] = [
                    ...listFatherGroup[Object.keys(e)],
                    ...Object.values(e)[0]
                  ])
            );
            return listFatherGroup;
          });
          this.setState({fathers : listFatherGroup});
          this.setState({title : 'HISTOIRE'});
//this.setState({title : 'HISTOIRE DE L ART',topics : data.topics,fathers : data.fathers});
  }
}

class Tree extends React.Component {
  render() {
    let arra = Object.keys(data.fathers);
    let arr = Array.from(this.props.father);
  //  return arr.map(e => {
      return (
        <li>
         {typeof arra}
        </li>)
      //})
  }

  //{this.props.data.topics[e].name}
//{this.props.data.topics[e].name} </li>;
  _getChild(e) {
    return (
      <ul>
        <Tree father={data.fathers[e]} />

      </ul>
    );

  }
    //<Tree father={this.props.data.fathers[e]} data={this.props.data} />
}

export default Outliner;
