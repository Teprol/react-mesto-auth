import { React, memo } from "react";

const Authentication = memo(({ title, buttonText, children }) => {
    return (
        <section className="authorization" aria-label="Форма регистрации">
            <form
                className="authorization__form"
                name="registration"
                action="*"
                method="post"
            >
                <h1 className="authorization__title">{title}</h1>
                <fieldset className="authorization__fieldset">
                    <input
                        className="authorization__import"
                        id="authorization-email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                    />
                    <input
                        className="authorization__import"
                        id="authorization-password"
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        required
                    />
                </fieldset>
                <button className="authorization__button" type="submit">
                    {buttonText}
                </button>
            </form>
            {children}
        </section>
    );
});

export default Authentication;