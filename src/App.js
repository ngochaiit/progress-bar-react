import React from 'react';
import styled from 'styled-components';
import ProgressBar from '../src/Component/ProgressBar'
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Endpoint from './Api/Endpoint';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column; 
   text-align: center;
   box-sizing: border-box;
`;

const ProgressBarContainer = styled.div`
  width:  100%;
  height: 40px;
  display: flex;
  justify-content: center;
`;
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttons: [],
            bars: [],
            limit: 0,
            indexProgressBar: 0,
        }
    }

    componentDidMount() {
        const responseData = this.callApiAxios();
        console.log(responseData);
        responseData.then(response => {
            console.log(response)
            this.setState({
                buttons: response.data.buttons,
                bars: response.data.bars,
                limit: response.data.limit,
            })
        })
            .catch(err => {
                console.log(err);
                alert(err);
                return null;
            });
    }


    callApiAxios = async () => {
        const response = await Endpoint.get('/bars');
        return response;
    }

    onClickButton = (e) => {
        const { indexProgressBar, bars, limit } = this.state;
        const barValue = bars[indexProgressBar];
        const value = parseInt(e.target.value,10);
        let newBarValue = barValue + value;
        if(newBarValue < 0) {
            newBarValue = 0;
        } else if(newBarValue > limit) {
            newBarValue = limit;
        }
        bars[indexProgressBar] = newBarValue;
        this.setState({
            ...this.state,
            bars,
        }, () => console.log(this.state.bars))
    }


    onHandleProgress = (event) => {
        this.setState({
            indexProgressBar: parseInt(event.target.value, 10)
        })
    }

    render() {
        const {buttons, bars, limit} = this.state;
        const widthButton = 100/(buttons.length + 2);
        const marginButton = widthButton*0.2;
        const sizeButton = widthButton*0.8;
        return (
            <AppWrapper>
                <div>
                    <h1> PROGRESS BAR EXAMPLE</h1>
                    {bars && bars.length > 0 ? bars.map((item, index) => (
                        <ProgressBarContainer key={`bar_${index}`}>
                            <ProgressBar percentage={item}/>
                        </ProgressBarContainer>
                    )) : null}
                </div>
               <div style={{display:'flex', justifyContent: 'center'}}>
                   <div style={{width: '100%'}}>
                       {buttons && buttons.length > 0 ? buttons.map((item, index) => (
                           <Button color="primary" value={item} key={`button_${index}`} style = {{marginRight: `${marginButton}%`, width: `${sizeButton}%`}} onClick={this.onClickButton}>{item}</Button>
                       )) : null}
                       <select id="cars" onChange={this.onHandleProgress}>
                           {bars && bars.length > 0 ? bars.map((item, index) => (
                               <option value={index} key={`progress_${index}`}>Progress {index + 1}</option>
                           )) : null}
                       </select>
                   </div>
               </div>

            </AppWrapper>
        );
    }
}

