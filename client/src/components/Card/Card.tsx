import React, { Fragment } from 'react';
import './Card.scss'
import { PriceCard } from './PriceCard';


const Card = (props:PriceCard) => {
		return (
			<Fragment>
				<div className="card-cst" style={{opacity:props.opacity}}>
					<h2>{props.plan}</h2>
					<hr />
					<p>{props.desc}</p>
					<h1>{props.price} € </h1>
					<p className="time">/ kk*</p>
					<p className="small">{props.descBottom}</p>
					<br />
				</div>
			</Fragment>
		);
    }

export default Card