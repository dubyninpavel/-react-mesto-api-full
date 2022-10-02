import AutorizationWithForm from "./AutorizationWithForm.js";

function Login({ onLogin }) {
    function handleSubmit(email, password) {
        onLogin(email, password);
    }

    return (
        <div className="page">
            <AutorizationWithForm
                title={'Вход'}
                link={'signup'}
                linkTitle={'Регистрация'}
                buttonTitle={'Войти'}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default Login;