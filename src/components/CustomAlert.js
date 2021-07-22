import styled from "styled-components";
import {BsCheckCircle} from 'react-icons/bs'
import {AiOutlineInfoCircle} from 'react-icons/ai'

const error = 'error'
const CustomAlertContainer = styled.div`
  box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
	border-radius: 4px;
	box-sizing: border-box;
	position: absolute;
	bottom: 30px;
	left: 50%;
	transform: translateX(-50%);
	padding: 0 15px;
	color: white;
	width: 300px;
	font-size: 24px;
	max-width: 300px;
	height: 30px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	${props => props.alertType === error ? 
					`background-Color: #f44336` :
					`background-color: #4caf50`
	};
	&	span {
		font-size: 14px;
		margin-left: 10px;
	}
`

const CustomAlert = ({alertText, alertType}) => {
	return (
		<CustomAlertContainer alertType={alertType}>
			{alertType === error ? <AiOutlineInfoCircle/> : <BsCheckCircle/>}
			<span>{alertText}</span>
		</CustomAlertContainer>
	)
}

export default CustomAlert