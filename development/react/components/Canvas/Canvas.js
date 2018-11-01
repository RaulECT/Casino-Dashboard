import React from 'react';
import ReactDOM from 'react-dom'
import imagesArray from '../../../../imagesArray'

const styles = {
	card: {
		cardImg: {
			width: '',
			height: ''
		},
		canvasSection: {
			width: '100%',
			height: '10rem'
		} 
	}
}

class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.card = [];
		this.props.card.map(item => {
			item.map(x => {
				this.card.push(x)
			})
		})
		this.multiplier = 0.5;
		console.log(this.props.barcode.length);
	}

	componentDidMount() {
		var ctx = this.node.getContext("2d");

		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, this.multiplier * 793, this.multiplier * 1122);

		ctx.fillStyle = 'black';
		ctx.font = `bold ${this.multiplier * 35}px Arial`;
		ctx.fillText(this.props.folio, this.multiplier * 65, this.multiplier * 50);

		// ctx.font = "bold 20px Arial";
		// ctx.fillText(this.props.barcode, 205, 50);

		bardcode.drawBarcode(ctx, this.props.barcode, {
			height: this.multiplier * 40,
			maxWidth: this.multiplier * 290,
			x: this.multiplier * 450,
			y: this.multiplier * 15
		});

		var iW = this.multiplier * 160;
		var iH = this.multiplier * 235;
		var iXSpace = this.multiplier * 10;
		var iYSpace = this.multiplier * 10;
		var iX = this.multiplier * 60;
		var iY = this.multiplier * 70;
		var cont = 0;
		for (var r = 0; r < 4; r++) {
			for (var c = 0; c < 4; c ++) {
				console.log( this.card[cont] )
				// TODO: GENERATE IMG
				//var img = document.getElementById('img'+this.card[cont]);
				//const img = <img key={`img_${this.card[cont]}`} src={imagesArray[this.card[cont]]} alt={`img_${this.card[cont]}`}/>
				const img = document.createElement( 'img' )
				img.setAttribute( 'src', imagesArray[ this.card[cont] ] )
				img.setAttribute( 'alt', `img_${imagesArray[ this.card[cont] ]}` )
				img.setAttribute( 'key', `img_${this.card[cont]}` )
				img.setAttribute( 'width', '30px' )
				img.setAttribute( 'height', '40px' )

				document.getElementById( 'root' ).appendChild( img )

				console.log( imagesArray[ this.card[cont] ] )
				ctx.drawImage(img, ((iW + iXSpace) * c) + iX, ((iH + iYSpace) * r) + iY, iW, iH);
				cont = cont + 1;
			}
		}

		ctx.fillStyle = "black";
		ctx.font = `bold ${this.multiplier * 35}px Arial`;
		ctx.fillText(this.props.folio, this.multiplier * 65, this.multiplier * 1080);

		bardcode.drawBarcode(ctx, this.props.barcode, {
			height: 40,
			maxWidth: 290,
			x: 450,
			y: 1055
		});

	}

	// render() {
	// 	return (
	// 		<div style={{width: '8.27in', height: '11.69in', margin: '10px auto'}}>
	// 			<canvas ref={node => this.node = node} width='793.92px' height='1122.24px' style={{border:'1px solid #d3d3d3', background: 'white'}}/>
	// 		</div>
	// 	);
	// }

	render() {
		var style = {
			// width: '8.27in',
			// height: '11.69in',
			width: this.multiplier * 8.27 + 'in',
			height: this.multiplier * 11.69 + 'in',
			margin: '10px auto'
		}

		return (
			<div style={style}>
				<canvas ref={node => this.node = node} width={this.multiplier * 793.92 + 'px'} height={this.multiplier * 1122.24 + 'px'} style={{border:'1px solid #d3d3d3', background: 'white'}}/>
				{/* <canvas ref={node => this.node = node} width={this.multiplier * 793.92 + 'px'} height={this.multiplier * 1122.24 + 'px'} style={{border:'1px solid #d3d3d3', background: 'white'}}/> */}
			</div>
		)
	}
}

module.exports = Canvas;
