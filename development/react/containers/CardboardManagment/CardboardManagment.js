import React, {Component} from 'react'
import { connect } from 'react-redux'
import jsPDF from 'jspdf'
import moment from 'moment'
import {
  createCardboard,
  searchCardboard,
  getCardboardsTotal,
  deleteCardboard
} from '../../store/actions/index'

import {
  Row,
  Col,
  Input,
  Form,
  Select,
  Button,
  Modal,
  Spin,
  notification
} from 'antd'
import CardboardCard from '../../components/CardboardCard/CardboardCard'
import Canvas from '../../components/Canvas/Canvas'

const Search = Input.Search
const FormItem = Form.Item
const Option = Select.Option
const confirm = Modal.confirm
const pdfConfig = {
  unit: 'in',
	format: [8.27, 11.69]
}

import './CardboardManagment.css'

class CardboardManagment extends Component {

  state = {
    cardboardType: null
  }

  componentDidMount() {
    this.props.onGetCardboardsTotal()
  }

  showConfirm = ( title, content, onOk ) => {
    confirm( {
      title,
      content,
      onOk() {
        onOk()
      },
      onCancel() {
        console.log( 'Holiiii' )
      }
    } )
  }

  handleOnCardboardTypeChange = e => {
    this.setState( { cardboardType: e } )
  }

  handleOnCreateCardboard = () => {
    this.showConfirm( 'Crear nuevo carton', '¿Desea crear un nuevo cartón?', () => { this.props.onCreateCardboard( this.state.cardboardType ) } )
  }

  handleOnPrintSingleCarboard = () => {
    const pdf = new jsPDF( pdfConfig )
    const canvas = document.getElementById( `cardboard_${this.props.cardboardSelected.numcode}` )
    const imgData = canvas.toDataURL('image/jpeg', 1.0)
    const fileName = `Carton_No.${this.props.cardboardSelected.numcode}.pdf`

    pdf.addImage( imgData, 'JPEG', 0, 0, 8.27, 11.69 )
    pdf.save( fileName )
  }

  handleOnPrintAllCarboards = () => {
    console.log(this)
    const pdf = new jsPDF( pdfConfig )
    const fileName = `${ moment( new Date ).format( 'DD-MM-YYYY HH:mm:ss' ) }.pdf`

    for (let index = 0; index < this.props.allCardboards.length; index++) {
      const canvas = this[`canvas${this.props.allCardboards[index].numcode}`].node
      const imgData = canvas.toDataURL( 'image/jpeg', 1.0 )
      
      pdf.addImage(imgData, 'JPEG', 0, 0, 8.27, 11.69)
      pdf.addPage()
    }

    pdf.save( fileName )
  }

  formatCardboards = ( cardboards ) => {
    const elements = []

    cardboards ? cardboards.map( cardboard => {
      const canvas = <Canvas ref={node => {this['canvas' + cardboard.numcode] = node}} key={ cardboard.numcode } card={ cardboard.card } barcode={ cardboard.barcode } folio={ cardboard.numcode } />
      elements.push( canvas )
      
    } ) : null

    return elements
  }

  openNotification = ( type, title, description ) => {
    notification[type]({
      message: title,
      description: description
    })
  }

  validateSearchValue = ( searchValue ) => {
    if ( searchValue.length === 6 ) {
      searchValue = parseInt( searchValue )

      if ( typeof searchValue === 'number' ) {
        this.props.onSearchCardboard( searchValue )
      } else {
        this.openNotification( 'warning', 'Folio Incorrecto', 'El folio debe ser un número.' )
      }
    } else {
      this.openNotification( 'warning', 'Folio Incorrecto', 'El folio del cartón debe ser de 6 dígitos.' )
    }
  }

  render() {
    const isCardboardTypeSelected = this.state.cardboardType ? false : true

    return(
      <div>
        <h3 className="cardboardManagment__sub-header">Existen <span className="cardboardManagment__cardboard-num">{this.props.cardboardsTotal}</span> cartones registrados en la base de datos.</h3>
      
        <Row  align="middle" gutter={20} >
          <Col span={12} >
            <Spin spinning={this.props.loading}>
              <FormItem
                label="Búsqueda de cartones:"
              >
                <Search 
                  placeholder="Ingrese el número del carton que desee buscar..."
                  enterButton
                  onSearch={ value => this.validateSearchValue( value ) }
                  size="large"
                />
              </FormItem>

              <FormItem
                label="Crear nuevo carton:"
              >
                <Select 
                  size="large" 
                  style={ { width: '65%', marginRight: '1rem' } }
                  placeholder="Tipo de carton"
                  onChange={this.handleOnCardboardTypeChange}
                >
                  <Option value="SINGLE">Carton Simple</Option>
                </Select>
                <Button
                  size="large"
                  type="primary"
                  icon="plus"
                  onClick={ this.handleOnCreateCardboard }
                  disabled={isCardboardTypeSelected}
                >
                  Crear carton
                </Button>
              </FormItem>

              <div className="cardboardManagment__options-group">
                <Button size="large" ghost type="primary" icon="picture">Ver todos los cartones</Button>
                <Button onClick={ this.handleOnPrintAllCarboards } size="large" ghost type="primary" icon="download">Descargar todos los cartones</Button>
              </div>
            </Spin>
          </Col>

          <Col
            span={12}
          >
            <Spin spinning={ this.props.loading }>
              <CardboardCard 
                onDelete={ () => { this.showConfirm( '¿Desea borrar este carton?', 'Una vez que se elimine este carton no se puede volver a recuperar', () => { this.props.onDeleteCardboard( this.props.cardboardSelected.barcode ) } ) } }
                onPrint={ this.handleOnPrintSingleCarboard }
                cardboard={this.props.cardboardSelected}
                cardboardImg={this.props.cardboardImg}
              />
            </Spin>
            
          </Col>
        </Row>

        <div style={ { display: 'none' } }>
          { this.formatCardboards( this.props.allCardboards ) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.crd.loading,
    cardboardsTotal: state.crd.cardboardsTotal,
    cardboardSelected: state.crd.cardboardSelected,
    cardboardImg: state.crd.cardboardImg,
    allCardboards: state.crd.allCardboards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateCardboard: ( cardboardType ) => dispatch( createCardboard( cardboardType ) ),
    onSearchCardboard: ( carboardId ) => dispatch( searchCardboard( carboardId ) ),
    onGetCardboardsTotal: () => dispatch( getCardboardsTotal() ),
    onDeleteCardboard: ( cardboardId ) => dispatch( deleteCardboard( cardboardId ) ),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(CardboardManagment)