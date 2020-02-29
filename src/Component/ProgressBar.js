import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Track = styled.div`
     width: 60%;
     height: 50%;
     background-color: black;
     border-radius: 10px;
     box-shadow: inset 0 0 5px #000;
     `;

const Thumb = styled.div`
     width: ${props => props.percentage <0 ? 0 : (props.percentage >100 ? 100 : props.percentage)}%;
     height: 100%;
     background-color: ${props => props.percentage > 100 ? 'red' : 'green'};
     border-radius: 10px;
     transition: width 0.3s ease-in-out;
    
     `;

const NumberShow = styled.span`
     width: 100%;
     height: 100%;
     
     `;
export default class ProgressBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {percentage} = this.props;
        console.log('testes', percentage);
        return (
            <Track style={{position: 'relative'}}>
                <Thumb percentage = {percentage} ></Thumb>
                <NumberShow style={{position:'absolute', bottom:'10%', right:'0%',color:'white' }}>{percentage}%</NumberShow>

            </Track>
        );
    }
}
ProgressBar.propTypes = {
    percentage: PropTypes.number.isRequired,
}

