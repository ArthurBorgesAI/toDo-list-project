import React from 'react';
import * as S from './styles';
import {Link} from 'react-router-dom';

import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';

function Header({ lateCount, clickNotification }) {
    return (
        <S.Container>
            <S.LeftSide>
                <img src={logo} alt="logo"/>;
            </S.LeftSide>

            <S.RightSide>
                <Link to="/">HOME</Link>
                <span className="slash"/>
                <Link to="/task">NEW TASK </Link>

                {
                    lateCount &&
                    <>
                    <span className="slash"/>
                    <button onClick={clickNotification} id="notification">
                        <img src={bell} alt="Notifications" />
                        <span>{lateCount}</span>
                    </button>
                    </>
                }
                


            </S.RightSide>
        </S.Container>
        )
}

export default Header;