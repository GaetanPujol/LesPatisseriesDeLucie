import { useNavigate } from "react-router-dom";
import { userService } from "../../../_services/user.service";
import { useState } from "react";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useSelector } from "react-redux";

const SignUpForm = (props) => {
  
  const [user, setUser] = useState({
  
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: ""
  
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const handleChange = (value, inputName) => {
  
    setUser({
  
      ...user,
      [inputName]: value
  
    });
  };

  const validateEmail = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  
  };

  const validatePassword = (password) => {

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  
  };

  const onSubmit = (e) => {
  
    e.preventDefault();
    const { pseudo, email, password, confirmPassword } = user;
  
    let errors = {};

    if (!pseudo) {
  
      errors.pseudo = "Veuillez entrer un pseudo";
  
    }
  
    if (!email) {
  
      errors.email = "Veuillez entrer une adresse e-mail";
  
    }
  
    else if (!validateEmail(email)) {
  
      errors.email = "Veuillez entrer une adresse e-mail valide";
  
    }
  
    if (!password) {
  
      errors.password = "Veuillez entrer un mot de passe";
  
    }
  
    else if (!validatePassword(password)) {
  
      errors.password = "Le mot de passe doit faire au moins 8 caractères et contenir au moins une lettre et un chiffre";
  
    }
  
    if (!confirmPassword) {
  
      errors.confirmPassword = "Veuillez confirmer votre mot de passe";
  
    }
  
    else if (confirmPassword !== password) {
  
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
  
    }

    if (Object.keys(errors).length === 0) {
  
      userService.addUser(user)
        .then(res => {
  
          navigate("/users/sign-in");
  
        })
        .catch(err => {
  
          if (err.response && err.response.data && err.response.data.message && err.response.data.message.includes('Duplicate entry')) {
  
            const errorMessageParts = err.response.data.message.split("'");
            const field = errorMessageParts[3];
            setErrorMessage(`Le ${field === 'pseudo' ? 'pseudo' : 'email'} est déjà utilisé`);
  
          }
          else if (err.response && err.response.data && err.response.data.message) {
  
            setErrorMessage(err.response.data.message);
  
          }
          else {
  
            console.log(err);
  
          }
        });
    }
    else {
  
      setErrors(errors);
  
    }
  };

  const { loading } = useSelector((store) => {
  
    return store.userState;
  
  });

  const handleRedirect = () => {
  
    navigate("/users/sign-in");
  
  };

  return (
  
    <form className="sign-up-form" onSubmit={onSubmit}>
  
    <h2>Créer un compte</h2>
  
     {errorMessage && <p className="error-message">{errorMessage}</p>}
  
    <Input
      label="Pseudo"
      id="pseudo"
      type="text"
      name="pseudo"
      value={user.pseudo}
      onChange={(value) => handleChange(value, "pseudo")}
    />

    {errors.pseudo && <p className="error-message">{errors.pseudo}</p>}

    <Input
      label="Email"
      id="email"
      type="text"
      name="email"
      value={user.email}
      onChange={(value) => handleChange(value, "email")}
    />

    {errors.email && <p className="error-message">{errors.email}</p>}

    <Input
      label="Mot de passe"
      id="password"
      type="password"
      name="password"
      value={user.password}
      onChange={(value) => handleChange(value, "password")}
    />
    
    {errors.password && <p className="error-message">{errors.password}</p>}
    
    <Input
      label="Confirmer le mot de passe"
      id="confirmPassword"
      type="password"
      name="confirmPassword"
      value={user.confirmPassword}
      onChange={(value) => handleChange(value, "confirmPassword")}
    />

    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
   
    <div className="btns">

      <Button type={"button"} text={"Se connecter"} onClick={handleRedirect} />
      <Button type={"submit"} text={loading ? "Chargement..." : "Valider"} disabled={loading} color={"#E0D5EC"} />

    </div>

  </form>

  );
};

export default SignUpForm;
