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
	},
	print: {
		cardImg: {
			width: '',
			height: ''
		},
		canvasSection: {
			width: `${(0.5 * 793.92)}px`,
			height: `${(0.5 * 1122.24)}px`
		} 
	}
}

class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.card = [];
		this.props.card.map(matrix => {
			this.aux = [];
			matrix.map(row => {
				row.map(item => {
					this.aux.push(item)
				})
			})
			this.card.push(this.aux);
		})

		this.pageWidth = 793;
		this.pageHeight = 1122;
		this.multiplier = this.props.multiplier;
		this.cardboardsNumber = this.props.card.length;

	}

	componentDidMount() {
		var ctx = this.node.getContext("2d");

		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, this.cardboardsNumber * this.multiplier * this.pageWidth, this.multiplier * this.pageHeight);

		for (var k = 0; k < this.props.card.length; k++) {
			this.drawCardboard(k, ctx);
		}
	}

	drawCardboard( cardboardNumber, ctx ) {
		ctx.fillStyle = 'black';
		ctx.font = `bold ${this.multiplier * 35}px Arial`;
		ctx.fillText(this.props.folio[cardboardNumber], this.multiplier * ((this.pageWidth * cardboardNumber) + 65), this.multiplier * 50);
		// ctx.fillText(this.props.folio, this.multiplier * 65, this.multiplier * 50);

		bardcode.drawBarcode(ctx, this.props.barcode[cardboardNumber], {
			height: this.multiplier * 40,
			maxWidth: this.multiplier * 290,
			x: this.multiplier * ((this.pageWidth * cardboardNumber) + 450),
			// x: this.multiplier * 450,
			y: this.multiplier * 15
		});


		var iW = this.multiplier * 160;
		var iH = this.multiplier * 235;
		var iXSpace = this.multiplier * 10;
		var iYSpace = this.multiplier * 10;
		// var iX = this.multiplier * 60;
		var iX = this.multiplier * ((this.pageWidth * cardboardNumber) + 60);
		var iY = this.multiplier * 70;
		var cont = 0;
		for (var r = 0; r < 4; r++) {
			for (var c = 0; c < 4; c ++) {
				//console.log( this.card[cont] )
				// TODO: GENERATE IMG
				//var img = document.getElementById('img'+this.card[cont]);
				//const img = <img key={`img_${this.card[cont]}`} src={imagesArray[this.card[cont]]} alt={`img_${this.card[cont]}`}/>
				const img = document.createElement( 'img' )
				const col = c
				const row = r
				const contAux = cont
				const cardImg = imagesArray[ this.card[cardboardNumber][ contAux ] ]

				// img.setAttribute( 'width', '5px' )
				// img.setAttribute( 'height', '7px' )
				img.onload = () => {
					ctx.drawImage(img, ((iW + iXSpace) * col) + iX, ((iH + iYSpace) * row) + iY, iW, iH);
				}

				img.setAttribute( 'src', cardImg )
				img.setAttribute( 'alt', `img_${imagesArray[ this.card[cont] ]}` )
				img.setAttribute( 'key', `img_${this.card[cardboardNumber][cont]}` )
			
				
				// console.log(imagesArray[ this.card[cont] ])
				//document.getElementById( 'root' ).appendChild( img )

				cont = cont + 1;
			}
		}

		ctx.fillStyle = "black";
		ctx.font = `bold ${this.multiplier * 35}px Arial`;
		ctx.fillText(this.props.folio[cardboardNumber], this.multiplier * ((this.pageWidth * cardboardNumber) + 65), this.multiplier * 1080);

		bardcode.drawBarcode(ctx, this.props.barcode[cardboardNumber], {
			height: 40,
			maxWidth: 290,
			// x: 450,
			x: this.multiplier * ((this.pageWidth * cardboardNumber) + 450),
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
			// width: this.multiplier * 8.27 + 'in',
			// height: this.multiplier * 11.69 + 'in',
			// margin: '10px auto',
			// zoom: 0.3
			width: this.cardboardsNumber * this.multiplier * this.pageWidth + 'px',
			height: this.multiplier * this.pageHeight + 'px',
			margin: '10px auto',
			zoom: '0.45',
			MozTransform: 'scale(0.5)'

		}

		return (
			<div style={style}>
				{/* <canvas id={`cardboard_${this.props.folio}`} ref={node => this.node = node} width={this.multiplier * 793.92 + 'px'} height={this.multiplier * 1122.24 + 'px'} style={{border:'1px solid #d3d3d3', background: 'white'}}/> */}
				{/* <canvas ref={node => this.node = node} width={this.multiplier * 793.92 + 'px'} height={this.multiplier * 1122.24 + 'px'} style={{border:'1px solid #d3d3d3', background: 'white'}}/> */}
				<canvas id={ `cardboard_${this.props.folio}` } ref={node => this.node = node} width={this.cardboardsNumber * this.multiplier * this.pageWidth + 'px'} height={this.multiplier * this.pageHeight + 'px'} style={{border:'1px solid #d3d3d3', background: 'white'}}/>
			</div>
		)
	}
}

module.exports = Canvas;
