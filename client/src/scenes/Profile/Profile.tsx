import React from "react";
import { useDispatch } from "react-redux";

import "./Profile.scss";
import strings from "./strings";
import { useHistory } from 'react-router-dom';
import PageHeader from "../../components/PageHeader/PageHeader"
import { cleanUpAndLogOut } from '../../store/auth/thunks';

const Profile = () => {

  const history = useHistory();
  const dispatch = useDispatch()

  return (
    <div className="profile-container">
      <PageHeader title={strings.profile} />
      <section className="profile-info">
      <h1>{'Testi Kuluttaja'}</h1>
      <h2>{'meili@example.fi'}</h2>
      </section>

      <section className="buttons-container">
        <div className="navi-button-container">
        <label>{strings.settings}</label>
        </div>
        <div className="navi-button-container">
          <label>{strings.categories}</label>
        </div>
        <div className="navi-button-container">
          <label>{strings.change_password}</label>
        </div>
        <div className="navi-button-container" onClick={() => dispatch(cleanUpAndLogOut()) && history.push("/")}>
          <label>{strings.logout}</label>
        </div>
      </section>
    </div>
    );
};
export default Profile;
