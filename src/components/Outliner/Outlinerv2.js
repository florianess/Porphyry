import React from "react";
import data from "./data";
import { render } from "react-dom";
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
    this.state = {title : 'HISTOIRE DE L ART',topics : data.topics,fathers : data.fathers};
  }
  render() {
    let tree = this._getTree();
    return (
      <div>
        <h1> {data.title} </h1>
          <ul>
            <Tree father={data.fathers.upper} />
          </ul>
      </div>
    );
  }
//<Tree father={this.state.fathers.upper} data={this.state}  />
  componentWillMount() {
    this._fetchData();
  }

  componentDidMount() {
    this._fetchData();
  }

  _getTree() {
      return <Tree father={this.state.fathers.upper} data={this.state} />
  }

  _fetchData() {
    /*
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
          })
          .then(x => this.setState({fathers : x}));
          this.setState({title : 'HISTOIRE'}); */
  //  this.setState({title : 'HISTOIRE DE L ART',topics : data.topics,fathers : data.fathers});
  }
}

class Tree extends React.Component {
  render() {
    return this.props.father.map(e => {
      if (typeof data.fathers[e] === "object") {
      //if (typeof this.props.data.fathers[e] === "object") {
        return (
          <li>
          {data.topics[e].name}

            {this._getChild(e)}
          </li>
        );
      } else {
        return <li>  {data.topics[e].name} </li>;
      }
    });
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
