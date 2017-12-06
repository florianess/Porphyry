import React from "react";
import Hypertopic from 'hypertopic';
import conf from '../../config/config.json';
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
    return (
      <div>
        <h1> {this.state.title} </h1>
          <ul>
            <Tree data={this.state} father={this.state.upper}/>
          </ul>
      </div>
    );
  }

  componentDidMount() {
    console.log("on fetch la data");
    this._fetchData();
    console.log("on set upper");
    console.log("on lance timer");
    this.timerID = setInterval(
     () => this.tick(),
     1000
   );
 }

 componentWillUnmount() {
   clearInterval(this.timerID);
 }

 tick() {
   if (this.state.fathers.upper !== this.state.upper){
     console.log("le upper change");
   this.setState({
     upper: this.state.fathers.upper
   });
  }
 }

  _fetchData() {

        const db = new Hypertopic(conf.services);

        var listFatherGroup = {};

        db.get({ _id: this.props.match.params.id })
          .then(x => {this.setState({topics : x.topics});
                this.setState({title : x.viewpoint_name});
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
            console.log(listFatherGroup);
            return listFatherGroup;
          });
          this.setState({fathers : listFatherGroup});
  }

}

class Tree extends React.Component {
    render() {
      if (Array.isArray(this.props.father)) {
        const peres = this.props.father.map( e => (typeof this.props.data.fathers[e] === "object") ?
            <li> {this.props.data.topics[e].name} <ul> {this._getFils(e)} </ul></li> :
            <li> {this.props.data.topics[e].name} </li>
        );
          return (<div> {peres} </div>);
      } else {
        return <li> NOTHING </li>
      }
    }

    _getFils(e) {
      return (
            <Tree father={this.props.data.fathers[e]} data={this.props.data} />
      );
    }
}

export default Outliner;
