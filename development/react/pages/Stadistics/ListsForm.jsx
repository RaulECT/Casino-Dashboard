import React,{Component} from 'react'
import {
  Card,
  Collapse,
  DatePicker,
  Divider,
  Button,
  Form,
  Icon,
  Input,
  List,
  message,
  Modal,
  Popconfirm,
  Select,
  Steps,
  Switch,
  Tag,
  TimePicker,
  Tooltip
} from 'antd'

const { RangePicker, MonthPicker, WeekPicker } = DatePicker
const { Step } = Steps
const FormItem = Form.Item
const Option = Select.Option
const Panel = Collapse.Panel

class ListsForm extends Component {

  constructor( props ) {
    super( props )

    this.input = null
    this.state = {
      emails: [],
      emailInputVisible: false,
      emailInputValue: '',
      stats: [],
      isRecurrent: false,
      hourSend: null,
      periodicity: '',
      rangePickerMode: [ 'month', 'month' ],
      range: {}
    }

    this.addStat = this.addStat.bind( this )
    this.cleanStatsFields = this.cleanStatsFields.bind( this )
    this.deleteStat = this.deleteStat.bind( this )
    this.handleCloseTag = this.handleCloseTag.bind( this )
    this.handleDateChange = this.handleDateChange.bind( this )
    this.handelEmailInputChange = this.handelEmailInputChange.bind( this )
    this.handleEmailInputConfirm = this.handleEmailInputConfirm.bind( this ) 
    this.handleHourChange = this.handleHourChange.bind( this )
    this.handlePeriodicityChange = this.handlePeriodicityChange.bind( this )
    this.handleRecurrent = this.handleRecurrent.bind( this )
    this.handleStartWeekChange = this.handleStartWeekChange.bind( this )
    this.handleStartMonthChange = this.handleStartMonthChange.bind( this )
    this.handleEndMonthChange = this.handleEndMonthChange.bind( this )
    this.handleEndWeekChange = this.handleEndWeekChange.bind( this )
    this.showEmailInput = this.showEmailInput.bind( this )
    this.saveInputRef = this.saveInputRef.bind( this )
    this.getStatsList = this.getStatsList.bind( this )
    this.getRangeCalendar = this.getRangeCalendar.bind( this )
    this.submitList = this.submitList.bind( this )
    this.resetFields = this.resetFields.bind( this )
  }

  componentDidMount() {
   
    if ( this.props.list ) {
      const { emails, stats, subject } = this.props.list

      this.props.form.setFieldsValue( {subject} )
      this.setState( { emails, stats } )
    }
  }

  addStat() {
    const {validateFields} = this.props.form
    const fields = ['statName', 'statType', 'statGraph', 'statDate']
    let { stats } = this.state

    validateFields( fields, {}, (err, values) => {
      if ( !err ) {
        console.log(values);
        
        const { statDate } = values
        const fisrtDate = statDate[0].format().split('T')
        const secondDate = statDate[1].format().split('T')

        values['startDate'] = fisrtDate[0]
        values['startTime'] = fisrtDate[1]
        values['endDate'] = secondDate[0]
        values['endTime'] = secondDate[1]

        this.setState( { stats: stats.concat( values ) }, this.cleanStatsFields() )
        
      }
    } )
  }

  cleanStatsFields() {
    const { setFieldsValue } = this.props.form

    setFieldsValue( {
      statName: '',
      statDate: ''
    } )
  }

  deleteStat( statName ) {
    const stats = this.state.stats.filter( stat => stat.statName !== statName )
    this.setState( {stats} )
  }

  handleCloseTag( removedEmail ) {
    const emails = this.state.emails.filter( email => email !== removedEmail )
    this.setState( {emails} )
  }

  handelEmailInputChange( e ) {
    this.setState( { emailInputValue: e.target.value } )
  }

  handleRecurrent( value ) {
    this.setState( {isRecurrent: value} )
  }

  handleStartWeekChange( date, dateString ) {
    let { range } = this.state
    range['start'] = dateString

    this.setState( { range } )
  }

  handleEndWeekChange( date, dateString ) {
    let { range } = this.state
    range[ 'end' ] = dateString

    this.setState( { range } )
  }

  handleStartMonthChange( date, dateString ) {
    let { range } = this.state
    range[ 'start' ] = dateString

    this.setState( { range } )
  }

  handleEndMonthChange( date, dateString ) {
    let { range } = this.state
    range[ 'end' ] = dateString

    this.setState( { range } )
  }

  handleEmailInputConfirm() {
    const state = this.state
    const inputValue = state.emailInputValue
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let emails = state.emails

    if ( inputValue && emails.indexOf( inputValue ) === -1 && re.test( inputValue ) ) {
      emails = emails.concat( inputValue )
    } else {
      message.error( 'Correo repetido o no cumple con el formato de un correo electronico.', 5 )
    }

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
            style={ {width: 85} }
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
      <Collapse bordered={false}>
        { stats.map( (item, index) => {
          return(
            <Panel header={`Estadistica: ${item.statName}`} key={index}>
              {`Tipo de estadistica: ${item.statType}`}<br/>
              {`Tipo de gráfica: ${item.statGraph}`}<br/>
              <Button onClick={ () => { this.deleteStat( item.statName ) }  } style={ {marginTop: 10} } type="danger" icon="delete">Eliminar Estadistica</Button>
            </Panel>
          )
        } ) }
      </Collapse>
    )
  }

  getModalFooter() {
    const { close, confirm, type } = this.props
    const okText = type === 'add' ? 'Crear lista' : 'Editar lista'
    const title = type === 'add' ? '¿Desea crear esta lista?' : '¿Desea editar esta lista?'

    return [
      <Button key="2" onClick={ ()=>{ close() } }>Cancelar</Button>,
      <Popconfirm key="1" title={title} onConfirm={ ()=>{ this.submitList() } }>
        <Button type="primary"> {okText} </Button>
      </Popconfirm>
    ]
  }

  getRangeCalendar() {
    const { periodicity, rangePickerMode } = this.state

    if ( periodicity === "everyWeek" ) {
      return(
        <div style={{ display: 'flex' }}>
          <FormItem
            label="Inicio"
          >
            <WeekPicker onChange={ this.handleStartWeekChange } />
          </FormItem>

          <FormItem
            label="Fin"
          >
            <WeekPicker onChange={ this.handleEndWeekChange } />
          </FormItem>
        </div>   
      )
    } else if( periodicity === "everyMonth" ) {
      return(
        <div style={{ display: 'flex' }}>
          <FormItem
            label="Inicio"
          >
            <MonthPicker onChange={this.handleStartMonthChange} />
          </FormItem>

          <FormItem
            label="Fin"
          >
            <MonthPicker onChange={this.handleEndMonthChange} />
          </FormItem>
        </div>   
      )
    } else {
      return(
        <FormItem
          label="Rango de fechas:"
        >
          <RangePicker 
            placeholder={['Fecha de Inicio', 'Fecha de Fin']} 
            onChange={this.handleDateChange}
          />
        </FormItem>
      )

    }
  }

  handleDateChange( dates, datesString ) {
    let { range } = this.state
    range[ 'start' ] = datesString[0]
    range[ 'end' ] = datesString[1]

    this.setState( { range } )
  }

  handlePeriodicityChange( value ) {
    this.setState( { periodicity: value, } )
  }

  handleHourChange( date, dateString ) {
    this.setState( {hourSend: dateString} )
  }

  submitList() {
    const { emails, stats } = this.state
    const {confirm} = this.props
    const { validateFields } = this.props.form

    validateFields( ['subject'], {}, ( err, values ) => {
      if ( !err && emails.length > 0 && stats.length > 0 ) {
        confirm( emails, stats, values.subject )
        this.resetFields()
      } else {
        message.error( 'No se han llenado todos los campos.', 5 )
      }
    } )
    
  }

  resetFields() {
    const { setFieldsValue } = this.props.form

    setFieldsValue( {
      subject: '',
      statName: '',
      statDate: '',
      statType: '',
      statGraph: ''
    } )

    this.setState( {
      emails: [],
      emailInputVisible: false,
      emailInputValue: '',
      stats: []
    } )
  }

  render() {
    const { close, visible, type } = this.props
    const { getFieldDecorator } = this.props.form
    const {isRecurrent, rangePickerMode} = this.state
    const periodicityStyle = isRecurrent ? { display: 'inline-flex' } :  { display: 'none' }
    const title = type === 'add' ? 'Crear nueva lista' : 'Editar lista'

    return(
      <Modal
        title={title}
        visible={visible}
        style={{ top: 20 }}
        width={1000}
        onCancel={close}
        footer={ this.getModalFooter() }
      >
        <Steps current={0}>
          <Step title="Crear Lista de Correo" description="" />
          <Step title="Configurar Lista de Correo" description="" />
          <Step title="Listo!" description="" />
        </Steps>

        <Form>
          <FormItem
            label="Asunto del correo:"
            className="subject-field"
          >
            { getFieldDecorator( 'subject', { rules: [{required: true, message: 'Ingrese un valor!'}] } )(
               <Input placeholder="" style={ {width: 500} } />
            ) }
          </FormItem>

          <div className="periodicity-section" style={ {display: 'flex', flexDirection: 'column'} }>
            <FormItem
              label="Activar envio recurrente"  
            >
              <Switch onChange={this.handleRecurrent} />
            </FormItem>

            <div style={periodicityStyle}>
              <FormItem
                label="Hora de envio:"
              >
                {
                  getFieldDecorator( 'shippingTime' )(
                    <TimePicker format="HH:mm" onChange={ this.handleHourChange } />
                  )
                }
              </FormItem>

              <FormItem
                label="Enviar cada:"
              >
                {
                  getFieldDecorator( 'periodicity' )(
                    <Select style={{ width: 180 }} onChange={this.handlePeriodicityChange}>
                      <Option key="everyDay" value="everyDay">Cada día</Option>
                      <Option key="everyWeek" value="everyWeek">Cada semana</Option>
                      <Option key="everyMonth" value="everyMonth">Cada mes</Option>
                    </Select>
                  )
                }
              </FormItem>

              { this.getRangeCalendar() }
            </div>
          </div>

          <Divider orientation="left">Emails</Divider>
          {this.getEmailsSection()}

          <Divider orientation="left">Estadisticas</Divider>

          <div className="stats-form">
            <FormItem
              label="Nombre:"
            >
              { getFieldDecorator( 'statName', { rules: [ {required: true, message: 'Ingrese un valor'} ] } )(
                <Input placeholder="Nombre de la estadistica" style={{width: 200}}/>
              ) }
            </FormItem>

            <FormItem
              label="Tipo de estadistica:"
            >
              { getFieldDecorator( 'statType', { rules: [ {required: true, message: 'Seleccione un valor'} ] } )(
                <Select style={{ width: 120 }} placeholder="Selecciones una estadistica">
                  <Option value="opt-1">Opt-1</Option>
                  <Option value="opt-2">Opt-2</Option>
                  <Option value="opt-3">Opt-3</Option>
                </Select>
              ) }
            </FormItem>

            <FormItem
              label="Tipo de gráfica:"
            >
              { getFieldDecorator( 'statGraph', { rules: [ {required: true, message: 'Seleccione un valor'} ] } )(
                <Select style={{ width: 120 }} placeholder="Selecciones una gráfica">
                  <Option value="opt-1">Opt-1</Option>
                  <Option value="opt-2">Opt-2</Option>
                  <Option value="opt-3">Opt-3</Option>
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