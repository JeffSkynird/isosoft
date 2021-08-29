import React from "react";
 
import Wheel from "./Ruleta";



import background from '../../../assets/Ruleta.png'

export default class TransicionRuleta extends React.Component {
  constructor() {
    super();
    this.places = ["ESCOGE TÚ EL PREMIO","OLLA ARROCERA","JUEGO DE OLLAS","HORNO","ESCOGE DOS PREMIOS", "LICUADORA","PARRILLA"
    ];
  }

  render() {
    return (
        <div
        style={{
          width: "450.2px",
          height:'700px',
          marginTop:'50px',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:  `url(${background})`,
    backgroundRepeat: 'no-repeat',

    backgroundSize: 'cover',

        }}
      >
            <p id="alert-dialog-slide-description" style={{   fontSize: '18px',
    textAlign: 'center',
    margin: '140px 0px 15px',color:'#22428b',
    padding:'0px 45px',
    fontWeight: 'bold'}}>
              ¡PARTICIPA GIRANDO LA RULETA!
          </p>
        <Wheel items={this.places} onSelectItem={this.props.onReward}/>
      </div>
    );
  }
}

 