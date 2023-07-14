import React from "react";
import okSvg from '../images/Union.svg';
import irSvg from '../images/Union2.svg';

const InfoTooltip = ({ isOpen, onClose }) => {
    //!переменные для отслеживания успешности регистрации
    const reg = false; //! временая переменная для теста
    return (
        <section
            className={`popup popup_info-Tooltip container ${!isOpen && 'popup_opened'}`}
            aria-label="Информационое окно"
        >
            <div className="popup__container popup__container_info-Tooltip">
                <button className="popup__close button hover" type="button" onClick={onClose} />
                <img className="popup__image-status" src={reg ? okSvg : irSvg} alt="" />
                <p className="popup__text-info">{reg ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}</p>
            </div>
        </section>
    )
}

export default InfoTooltip;