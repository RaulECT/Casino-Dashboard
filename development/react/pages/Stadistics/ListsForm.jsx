import React,{Component} from 'react'
import {
  DatePicker,
  Divider,
  Button,
  Form,
  Icon,
  Input,
  List,
  Modal,
  Popconfirm,
  Select,
  Tag,
  Tooltip
} from 'antd'

const { RangePicker } = DatePicker
const FormItem = Form.Item
const Option = Select.Option

class ListsForm extends Component {

  constructor( props ) {
    super( props )

    this.input = null
    this.state = {
      emails: [],
      emailInputVisible: false,
      emailInputValue: '',
      stats: []
    }

    this.addStat = this.addStat.bind( this )
    this.handleCloseTag = this.handleCloseTag.bind( this )
    this.handelEmailInputChange = this.handelEmailInputChange.bind( this )
    this.handleEmailInputConfirm = this.handleEmailInputConfirm.bind( this ) 
    this.showEmailInput = this.showEmailInput.bind( this )
    this.saveInputRef = this.saveInputRef.bind( this )
    this.getStatsList = this.getStatsList.bind( this )
  }

  addStat() {
    const {validateFields} = this.props.form
    let { stats } = this.state

    validateFields( (err, values) => {
      if ( !err ) {
        const { statDate } = values
        const fisrtDate = statDate[0].format().split('T')
        const secondDate = statDate[1].format().split('T')

        values['startDate'] = fisrtDate[0]
        values['startTime'] = fisrtDate[1]
        values['endDate'] = secondDate[0]
        values['endTime'] = secondDate[1]

        this.setState( { stats: stats.concat( values ) } )
        
      }
    } )
  }

  handleCloseTag( removedEmail ) {
    const emails = this.state.emails.filter( email => email !== removedEmail )
    console.log( emails );
    this.setState( {emails} )
  }

  handelEmailInputChange( e ) {
    this.setState( { emailInputValue: e.target.value } )
  }

  handleEmailInputConfirm() {
    const state = this.state
    const inputValue = state.emailInputValue
    let emails = state.emails

    if ( inputValue && emails.indexOf( inputValue ) === -1 ) {
      emails = emails.concat( inputValue )
    }

    console.log( emails );
    this.setState( {
      emails,
      emailInputVisible: false,
      emailInputValue: ''
    } )
    
  }

  showEmailInput() {
    this.setState( { emailInputVisible: true } )
  }

  saveInputRef(input) {
    this.input = input
  }

  getEmailsSection() {
    const { emails, emailInputValue, emailInputVisible } = this.state

    return (
      <div>
        { emails.map( (email, index) => {
          const tagElement = (
            <Tag key={email} closable afterClose={ () => { this.handleCloseTag( email ) } }>
              {email}
            </Tag>
          )

          return <Tooltip title={email} key={email}>{tagElement}</Tooltip>
        } )}

        { emailInputVisible && (
          <Input 
            ref={ (input) => { this.input = input } }
            type="text"
            size="small"
            style={ {width: 78} }
            value={emailInputValue}
            onChange={this.handelEmailInputChange}
            onBlur={this.handleEmailInputConfirm}
            onPressEnter={this.handleEmailInputConfirm}
          />
        ) }
        { !emailInputVisible && (
          <Tag
            onClick={this.showEmailInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> Agregar Email
          </Tag>
        )
        }
      </div>
    )
  }

  getStatsList() {
    const { stats } = this.state

    return(
      <List 
        itemLayout="horizontal"
        dataSource={stats}
        renderItem={item => (
          <List.Item actions={[<a>Eliminar</a>]}>
            <List.Item.Meta
              title={item.statName}
              description={ 
                <div>
                  {`Tipo de estadistica: ${item.statType}`}<br/>
                  {`Tipo de gráfica: ${item.statGraph}`}<br/>
                  {`Fecha y Hora de inicio: ${item.startDate} - ${item.startTime}`}<br/>
                  {`Fecha y Hora de fin: ${item.endDate} - ${item.endTime}`}<br/>
                </div>
              }
            />
    
          </List.Item>
        )}
      />
    )
  }

  getModalFooter() {
    const { close, confirm, type } = this.props
    const okText = type === 'add' ? 'Crear lista' : 'Editar lista'
    const title = type === 'add' ? '¿Desea crear esta lista?' : '¿Desea editar esta lista?'

    return [
      <Button key="2" onClick={ ()=>{ close() } }>Cancelar</Button>,
      <Popconfirm key="1" title={title} onConfirm={ ()=>{ confirm() } }>
        <Button type="primary"> {okText} </Button>
      </Popconfirm>
    ]
  }

  render() {
    const { close, visible, type } = this.props
    const { getFieldDecorator } = this.props.form
    const title = type === 'add' ? 'Crear nueva lista' : 'Editar lista'

    return(
      <Modal
        title={title}
        visible={visible}
        style={{ top: 20 }}
        width={900}
        onCancel={close}
        footer={ this.getModalFooter() }
      >
        <Form>
          <FormItem
            label="Asunto del correo:"
          >
            { getFieldDecorator( 'subject', { rules: [{required: true, message: 'Ingrese un valor!'}] } )(
               <Input placeholder="" style={ {width: 500} } />
            ) }
          </FormItem>

          <Divider orientation="left">Emails</Divider>
          {this.getEmailsSection()}

          <Divider orientation="left">Estadisticas</Divider>

          <div className="stats-form">
            <FormItem
              label="Nombre:"
            >
              { getFieldDecorator( 'statName', { rules: [ {required: true, message: 'Ingrese un valor'} ] } )(
                <Input placeholder="Nombre de la estadistica"/>
              ) }
            </FormItem>

            <FormItem
              label="Tipo de estadistica:"
            >
              { getFieldDecorator( 'statType', { rules: [ {required: true, message: 'Seleccione un valor'} ] } )(
                <Select style={{ width: 120 }} placeholder="Selecciones una estadistica">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              ) }
            </FormItem>

            <FormItem
              label="Tipo de gráfica:"
            >
              { getFieldDecorator( 'statGraph', { rules: [ {required: true, message: 'Seleccione un valor'} ] } )(
                <Select style={{ width: 120 }} placeholder="Selecciones una gráfica">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              ) }
            </FormItem>

            <FormItem
              label="Rango de fechas:"
            >
              { getFieldDecorator( 'statDate', { rules: [ {required: true, message: 'Seleccione un valor'} ] } )(
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['Start Time', 'End Time']}
                />
              ) }
            </FormItem>
            
            <FormItem>
              <Button icon="line-chart" onClick={this.addStat}>Añadir Estadistica</Button>
            </FormItem>
            
          </div>
          
          { this.getStatsList() }

        </Form>

      </Modal>
    )
  }
}

const WrappedListsForm = Form.create()(ListsForm);
module.exports = WrappedListsForm