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
import { CARDBOARDS_NUMCODE_LENGTH } from '../../../../config/config'

import {
  Row,
  Col,
  Input,
  Form,
  Select,
  Button,
  Modal,
  Spin,
  notification,
  Icon
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

  shouldComponentUpdate( nextProps, nextState ) {
    const isCardboardImgNotNull = nextProps.cardboardImg !== null
    const isCardboardSelectedNotNull = nextProps.cardboardSelected !== null
    const areCardboardsChange = nextProps.cardboardsTotal !== 0

     
    if (nextProps.loading !== this.props.loading) {
      return true
    }

    if ( isCardboardImgNotNull || isCardboardSelectedNotNull || areCardboardsChange ) {
      const isCardboardSelectedChange = nextProps.cardboardSelected ? this.props.cardboardSelected ? nextProps.cardboardSelected.id !== this.props.cardboardSelected.id : true : false //nextProps.cardboardSelected !== null && (nextProps.cardboardSelected.id !== this.props.cardboardSelected.id)
      const isCardboardsNumberDifferent = nextProps.cardboardsTotal !== this.props.cardboardsTotal

      if ( isCardboardSelectedChange || isCardboardsNumberDifferent ) {
        return true
      } else {
        if( nextState.cardboardType !== this.state.cardboardType ) { return true }

        return false
      }
 
    } else {
      if( nextState.cardboardType !== this.state.cardboardType ) { return true }

      return false
    }
    
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

    const pdf = new jsPDF()
    const fileName = `Carton_No.${this.props.cardboardSelected.numcode}.pdf`
    const canvas = this[`canvas${this.props.cardboardSelected.numcode}`].node
    const imgData = canvas.toDataURL( 'image/jpeg', 1.0 )

    pdf.deletePage(1)
    pdf.addPage( [ ( this.props.cardboardSelected.card.length ) * 210, 297 ] )
    pdf.addImage( imgData, 'JPEG', 0, 0, ( this.props.cardboardSelected.card.length ) * 210, 297 )

    pdf.save( fileName )

  }

  handleOnPrintAllCarboards = () => {
    const pdf = new jsPDF()
    const fileName = `${ moment( new Date ).format( 'DD-MM-YYYY HH:mm:ss' ) }.pdf`

    pdf.deletePage(1)

    for (let index = 0; index < this.props.allCardboards.length; index++) {
      const canvas = this[`canvas${this.props.allCardboards[index].numcode}`].node
      const imgData = canvas.toDataURL( 'image/jpeg', 1.0 )

      pdf.addPage([(( this.props.allCardboards[index].card.length )) * 210, 297]);
			pdf.addImage(imgData, 'JPEG', 0, 0, ( this.props.allCardboards[index].card.length ) * 210, 297);
    
    }

    pdf.save( fileName )
  }

  formatCardboards = ( cardboards ) => {
    const elements = []

    cardboards ? cardboards.map( cardboard => {
      const canvas = <Canvas multiplier={2} ref={node => {this['canvas' + cardboard.numcode] = node}} key={ cardboard.numcode } card={ cardboard.card } barcode={ cardboard.barcode } folio={ cardboard.numcode } />
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
    if ( searchValue.length === CARDBOARDS_NUMCODE_LENGTH ) {
      searchValue = parseInt( searchValue )

      if ( typeof searchValue === 'number' ) {
        this.props.onSearchCardboard( searchValue )
      } else {
        this.openNotification( 'warning', 'Folio Incorrecto', 'El folio debe ser un número.' )
      }
    } else {
      this.openNotification( 'warning', 'Folio Incorrecto', `El folio del cartón debe ser de ${CARDBOARDS_NUMCODE_LENGTH} dígitos.` )
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
                  <Option value="DOUBLE">Carton Doble</Option>
                  <Option value="TRIPLE">Carton Triple</Option>
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
                <a href="http://104.192.4.252:3001/#/" target="_blank"> <Icon type="picture" /> Ver todos los cartones</a>
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