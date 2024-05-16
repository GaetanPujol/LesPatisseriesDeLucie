import "./sign-in-form.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { accountService } from "../../../_services/account.service";


const SignInForm = (props) => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({

    email: "",
    password: ""

  });

  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (value, inputName) => {

    setCredentials({
      ...credentials,
      [inputName]: value

    });
  };

  const onSubmit = async(e) => {

    e.preventDefault();

    try {

      const res = await accountService.login(credentials);
      accountService.saveToken(res.data.token);
      navigate("/home");

    }

    catch (err) {

      if (err.response && err.response.status === 401) {

        setErrorMessage("Adresse e-mail ou mot de passe incorrect.");

      }
      else {

        setErrorMessage("Une erreur s'est produite lors de la connexion.");

      }
    }
  };

  const handleRedirect = () => {

    navigate("/users/sign-up");

  };

  return (

    <form onSubmit={onSubmit} className="sign-up-form">
   
        <h2>Se connecter</h2>
   
        {errorMessage && <p className="error-message">{errorMessage}</p>}
   
        <Input
          id="email"
          label="Email"
          type="text"
          name="email"
          value={credentials.email}
          onChange={(value) => handleChange(value, "email")}
        />
   
        <Input
          id="password"
          label="Mot de passe"
          type="password"
          name="password"
          value={credentials.password}
          onChange={(value) => handleChange(value, "password")}
        />
   
        <div className="btns">
   
          <Button
            type={"button"}
            text={"Creer son compte"}
            onClick={handleRedirect}
          />
   
          <Button
            type={"submit"}
            text={"Valider"}
            color={"#E0D5EC"}
          />
   
        </div>
   
      </form>

  );
};

export default SignInForm;
