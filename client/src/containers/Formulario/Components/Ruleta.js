import React from "react";

import "../style/ruleta.css";
import ruletaPanel from '../../../assets/ruletaPanel.png'
export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      this.setState({ selectedItem });
      if (this.props.onSelectItem) {
    
        setTimeout(() => this.props.onSelectItem(this.props.items[selectedItem]), 4000);
      }
    
    } else {
      
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem, backgroundImage: 'url('+ruletaPanel+')'
    };
    const spinning = selectedItem !== null ? "spinning" : "";


    return (
      <div className="wheel-container">
        <div
          className={`wheel ${spinning}`}
          style={wheelVars}
          onClick={this.selectItem}
        >
          {items.map((item, index) => (
            <div
              className="wheel-item"
              key={index}
              style={{ "--item-nb": index,paddingBottom:'160px' }}
            >
             
             <div style={{display: 'flex',
    justifyContent: 'center'}} >
             <p style={{margin:'0px',transform: 'rotate(-280deg)',fontSize: '10px',display: 'flex',textAlign: 'center',
    fontWeight: 'bold',width: item=="OLLA ARROCERA"?'20px':'10px',marginRight: '45px'}}>{item}</p>
             <img
            src={'https://api.ambiensa.info/storage/email_storage/'+item+'.png'}
            alt=""
     
            style={{ width: "100px",height:'100px',transform: 'rotate(-280deg)'}}
          />
      
               </div> 
            </div>
          ))}
        </div>
      </div>
    );
  }
}
