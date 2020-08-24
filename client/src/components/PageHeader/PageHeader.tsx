import React from "react";
import "./PageHeader.scss";
import Delete from "../../common/icon/delete.svg";
import Edit from "../../common/icon/edit.svg";


interface PageHeaderProps {
    title: string,
    showIcon?: boolean,
    editIconClickAction?: any
    deleteIconClickAction?: any
}

const PageHeader = (props: PageHeaderProps) => {
    return (
        <header className="page-header">
            <label className="pohatta">{'POHATTA'}</label>
            {props.showIcon ? (
                <h1>{props.title}
                <span className="icon" onClick={() => props.editIconClickAction()}><img src={Edit} alt="Delete"></img></span>
                <span className="icon" onClick={() => props.deleteIconClickAction()}><img src={Delete} alt="Delete"></img></span>
                </h1>
            ): (
                <h1>{props.title}</h1>
            )}

        </header>

    );

}
export default PageHeader;
