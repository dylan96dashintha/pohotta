import * as React from 'react';
import './VeiryfyQuestionBox.scss';

interface IVeiryfyQuestionBoxProps {
    onCancel : (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    onConfirm :(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void,
    title : string,
    confirmText : string,
    cancelText : string,
}

type Props = IVeiryfyQuestionBoxProps;

const VeiryfyQuestionBox: React.FunctionComponent<Props> = (props) => {
  return <div className="verify-question-box-wrapper">
  <div className="background" onClick={props.onCancel}/>
  <div className="verify-question-box">
      <label className="title">{props.title}</label>
      <div className="buttons">
          <label onClick={props.onCancel} >
              {props.cancelText}
          </label>
          <label onClick={props.onConfirm}>
              {props.confirmText}
          </label>
      </div>
  </div>
</div>
};


export default VeiryfyQuestionBox;