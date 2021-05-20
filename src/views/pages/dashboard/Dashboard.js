import React from 'react'
import {CRow, CCol, CWidgetDropdown, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem,
    CCard,
    CCardFooter,
    CCardHeader,
    CCardBody,
    CDataTable,
    CButton,
    CButtonGroup
} from '@coreui/react'
import ReactHighcharts from 'highcharts-react-official'
import Highcharts from 'highcharts'
import CIcon from '@coreui/icons-react'
import { withTranslation } from 'react-i18next';
import Colors from '../../../config/Colors'

var profitLossConfig = {
    title: {
      text: ''
    },
    xAxis: {
      title: {
        text: 'Month'
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [{
      type: 'spline',
      name: 'Income',
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
    },
    {
      type: 'spline',
      name: 'Expense',
      data: [300, 320.4, 410.4, 429.7, 449.0, 390.0, 340.6, 353.5, 210.4, 385.1, 385.6, 264.4]
    }],
    credits:{
        enabled:false
    }
  };
var salesConfig = {
    title: {
      text: ''
    },
    xAxis: {
      title: {
        text: 'Month'
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [
    //     {
    //   type: 'spline',
    //   name: 'First',
    //   data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
    // },
    {
      type: 'spline',
      name: 'First',
      data: [300, 320.4, 410.4, 429.7, 449.0, 390.0, 340.6, 353.5, 210.4, 385.1, 385.6, 264.4]
    }],
    credits:{
        enabled:false
    }
  };
  var config2 = {
    title: {
      text: ''
    },
    xAxis: {
      title: {
        text: 'Month'
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
//     series: [{
//       type: 'column',
//       name: 'First',
//       data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
//     },
//     {
//       type: 'column',
//       name: 'Second',
//       data: [300, 320.4, 410.4, 429.7, 449.0, 390.0, 340.6, 353.5, 210.4, 385.1, 385.6, 264.4]
//     }
// ],
    series: [{
        type: 'column',
        name: 'Operating',
        data: [10]
    },
    {
        type: 'column',
        name: 'Depreciation',
        data: [20]
    },
    {
        type: 'column',
        name: 'Payroll',
        data: [25]
    },
    {
        type: 'column',
        name: 'Telephone',
        data: [40]
    },
    {
        type: 'column',
        name: 'Vehicle Fuel',
        data: [30]
    },
    {
        type: 'column',
        name: 'Maintainance',
        data: [26]
    },
    {
        type: 'column',
        name: 'Travel',
        data: [37]
    },
    {
        type: 'column',
        name: 'Utilities',
        data: [44]
    },
    {
        type: 'column',
        name: 'Uncategorized',
        data: [20]
    }],
    credits:{
        enabled:false
    }
  };
class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state={
            buttonBgColor: Colors.themeDark,
            toggleChart: false,
            activeQuater: 'Q1',
            activeMonth: 'Day',
            payableData: [
                {id: 0, 'Invoices Payable to you': 'Coming Due', Amount: '$0.0', 'Bills you owe': 'Coming Due', Amount2: '$0.0'},
                {id: 1, 'Invoices Payable to you': '1-31 days overdue', Amount: '$0.0', 'Bills you owe': '1-31 days overdue', Amount2: '$0.0'},
                {id: 2, 'Invoices Payable to you': '31-60 days overdue', Amount: '$0.0', 'Bills you owe': '31-60 days overdue', Amount2: '$0.0'},
                {id: 2, 'Invoices Payable to you': '61-90 days overdue', Amount: '$0.0', 'Bills you owe': '61-90 days overdue', Amount2: '$0.0'}
            ],
            payableFields:  [
                { key: 'Invoices Payable to you'},
                'Amount',
                { key: 'Bills you owe'},
                { key: 'Amount'},
            ],
            netIncomeData: [
                {id: 0, 'Fiscal Year': 'Income', '2021': '$0.0', '2020': '$0.0', '2019': '$0.0'},
                {id: 1, 'Fiscal Year': 'Expense', '2021': '$0.0', '2020': '$0.0', '2019': '$0.0'},
                {id: 2, 'Fiscal Year': 'Net Income', '2021': '$0.0', '2020': '$0.0', '2019': '$0.0'}
            ],
            netIncomeFields:  [
                { key: 'Fiscal Year'},
                '2021',
                { key: '2020'},
                { key: '2019'},
            ],
        }
        this.toggleLineChart = this.toggleLineChart.bind(this)
        
    }
    componentDidMount(){
        // let user = JSON.parse(localStorage.getItem('userInfo'))
        // console.log(">>>>>?>????????????????>", user.value)
    }
    toggleLineChart(){
        this.setState({toggleChart: this.state.toggleChart ? false : true})
    }
    render(){
        return(
            <CRow>
                <CCol sm="6" lg="3">
                    <CWidgetDropdown
                    style={{backgroundColor: Colors.dashboardFirstTile}}
                    header="9.823"
                    text="Members online"
                    // footerSlot={
                    //     <ChartLineSimple
                    //     pointed
                    //     className="c-chart-wrapper mt-3 mx-3"
                    //     style={{height: '70px'}}
                    //     dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                    //     pointHoverBackgroundColor="primary"
                    //     label="Members"
                    //     labels="months"
                    //     />
                    // }
                    >
                    <CDropdown>
                        <CDropdownToggle color="transparent">
                        <CIcon name="cil-settings"/>
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                        <CDropdownItem>Action</CDropdownItem>
                        <CDropdownItem>Another action</CDropdownItem>
                        <CDropdownItem>Something else here...</CDropdownItem>
                        <CDropdownItem disabled>Disabled action</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                    </CWidgetDropdown>
                </CCol>
                <CCol sm="6" lg="3">
                    <CWidgetDropdown
                    style={{backgroundColor:Colors.dashboardSecondTile}}
                    header="9.823"
                    text="Members online"
                    >
                    <CDropdown>
                        <CDropdownToggle color="transparent">
                        <CIcon name="cil-settings"/>
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                        <CDropdownItem>Action</CDropdownItem>
                        <CDropdownItem>Another action</CDropdownItem>
                        <CDropdownItem>Something else here...</CDropdownItem>
                        <CDropdownItem disabled>Disabled action</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                    </CWidgetDropdown>
                </CCol>
                <CCol sm="6" lg="3">
                    <CWidgetDropdown
                    style={{backgroundColor: Colors.dashboardThirdTile}}
                    header="9.823"
                    text="Members online"
                    >
                    <CDropdown>
                        <CDropdownToggle color="transparent">
                        <CIcon name="cil-settings"/>
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                        <CDropdownItem>Action</CDropdownItem>
                        <CDropdownItem>Another action</CDropdownItem>
                        <CDropdownItem>Something else here...</CDropdownItem>
                        <CDropdownItem disabled>Disabled action</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                    </CWidgetDropdown>
                </CCol>
                <CCol sm="6" lg="3">
                    <CWidgetDropdown
                    style={{backgroundColor: Colors.dashboardFourthTile}}
                    header="9.823"
                    text="Members online"
                    >
                    <CDropdown>
                        <CDropdownToggle color="transparent">
                        <CIcon name="cil-settings"/>
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                        <CDropdownItem>Action</CDropdownItem>
                        <CDropdownItem>Another action</CDropdownItem>
                        <CDropdownItem>Something else here...</CDropdownItem>
                        <CDropdownItem disabled>Disabled action</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                    </CWidgetDropdown>
                </CCol>

                <CCol sm="6">
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol sm="3">
                                    <h4 id="traffic" className="card-title mb-0">{this.state.toggleChart ? this.props.t('Content.Dashboard.Profit and Loss') : this.props.t('Content.Dashboard.Sales')}</h4>
                                </CCol>
                                <CCol sm="9">
                                    <CButton style={{backgroundColor:Colors.themeDark}} className="float-right">
                                        <CIcon name="cil-cloud-download" style={{color:'white'}}/>
                                    </CButton>
                                    <CButtonGroup className="float-right mr-3">
                                        {
                                        ['Q1', 'Q2', 'Q3', 'Q4'].map(value => (
                                            <CButton
                                            color="outline-secondary"
                                            key={value}
                                            className="mx-0"
                                            active={value === this.state.activeQuater}
                                            onClick={() => this.setState({activeQuater: value}) }
                                            >
                                            {value}
                                            </CButton>
                                        ))
                                        }
                                    </CButtonGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                <div className="small text-muted">{this.props.t('Content.Dashboard.Income and expenses only')}</div>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <ReactHighcharts highcharts={Highcharts} options={this.state.toggleChart ? profitLossConfig : salesConfig}></ReactHighcharts>
                            
                        </CCardBody>
                        <CCardFooter>
                            <CButton 
                                style={{backgroundColor:this.state.buttonBgColor, color:Colors.white}} 
                                onMouseEnter={() => this.setState({buttonBgColor: Colors.themeGreen})} 
                                onMouseLeave={() => this.setState({buttonBgColor: Colors.themeDark})}  
                                className="float-right" 
                                onClick={this.toggleLineChart}
                            >
                                {this.state.toggleChart ? 'Sales':'Profit and Loss'}
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
                <CCol sm="6">
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol sm="5">
                                    <h5 id="traffic" className="card-title mb-0">{this.props.t('Content.Dashboard.Expense Breakdown')}</h5>
                                    <div className="small text-muted"></div>
                                </CCol>
                                <CCol sm="7">
                                    <CButtonGroup className="float-right mr-3">
                                        {
                                        ['Day', 'Month', 'Year'].map(value => (
                                            <CButton
                                            color="outline-secondary"
                                            key={value}
                                            className="mx-0"
                                            active={value === this.state.activeMonth}
                                            onClick={() => this.setState({activeMonth: value})}
                                            >
                                            {value}
                                            </CButton>
                                        ))
                                        }
                                    </CButtonGroup>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                        <ReactHighcharts highcharts={Highcharts} options={config2}></ReactHighcharts>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm="6">
                    <CCard>
                        <CCardHeader>
                            Payable and Owing
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={this.state.payableData}
                                fields={this.state.payableFields}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm="6">
                    <CCard>
                        <CCardHeader>
                            Net Income
                        </CCardHeader>
                        <CCardBody>
                        <CDataTable
                            items={this.state.netIncomeData}
                            fields={this.state.netIncomeFields}
                        />
                        </CCardBody>
                    </CCard>
                </CCol>            
            </CRow>
        )
    }
}

export default withTranslation()(Dashboard);