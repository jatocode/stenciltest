import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true
})
export class AppProfile {
  @Prop() match: MatchResults;
  @State() selected: String = "ingen";

  normalize(name: string): string {
    if (name) {
      return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
    }
    return '';
  }

  changeSelected(s:String) {
    this.selected = s;
  }

  render() {
    if (this.match && this.match.params.name) {
      let boxes = [{name:'Olycka 1', value:1, checked:false},
                   {name:'Olycka 2', value:2, checked:true},
                   {name:'Olycka 3', value:3, checked:false}];
      return (
        <div class="app-profile">
          <p>
            Hello! My name is {this.normalize(this.match.params.name)}. My name was passed in
            through a route param!
          </p>
          <p>Vald: {this.selected}</p>
          <div>
            <ul>
            {boxes.map(function(box, index) {
                return <li key={index}>{box.name}
                <input type='checkbox'
                  onChange={() => this.changeSelected(box.name)} name={box.name} checked={this.selected === box.name} value={box.value}/></li>
              }, this)
            }
           </ul>
          </div>
        </div>
      );
    }
  }
}
