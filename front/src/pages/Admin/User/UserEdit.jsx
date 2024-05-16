import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../../../_services/user.service';
import { useSelector } from 'react-redux';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import './user.scss';

const UserEdit = () => {

    const [user, setUser] = useState({ pseudo: '', role: '' });
    const [error, setError] = useState('');
    const flag = useRef(false);
    const navigate = useNavigate();
    const { uid } = useParams();
    const { loading } = useSelector((store) => store.userState);

    useEffect(() => {

        if (!flag.current) {

            userService.getUser(uid)
                .then(res => {

                    setUser(res.data.user);

                })

                .catch(err => console.log(err));

        }

        return () => flag.current = true;

    }, [uid]);

    const handleChange = (value, inputName) => {

        setUser(prevUser => ({

            ...prevUser,
            [inputName]: value

        }));

        setError('');

    };

    const onSubmit = (e) => {

        e.preventDefault();

        userService.adminUpdateUser(user)
            .then(res => {

                navigate('../index');

            })
            .catch(err => {

                if (err.response && err.response.status === 500 && err.response.data.message.includes('Duplicate entry')) {

                    setError('Ce pseudo est déjà utilisé. Veuillez en choisir un autre.');

                }
                else {

                    setError('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.');
                    console.log(err);

                }
            });

    };

    const allowedRoles = ['membre', 'admin'];

    return (

        <form onSubmit={onSubmit} className="userEdit">
        
            <h2>Modification de l'utilisateur</h2>
        
             {error && <p className="error">{error}</p>}
        
            <Input
        
                label="Pseudo"
                type="text"
                name="pseudo"
                value={user.pseudo}
                onChange={(value) => handleChange(value, 'pseudo')}
        
            />
          
            
          <section className="form-group">
    
            <label htmlFor="role" className="form-label">Rôle:</label>
        
            <select
        
                id="role"
                name="role"
                value={user.role}
                onChange={(e) => handleChange(e.target.value, 'role')}
                className="form-select"
    
                >
        
              {allowedRoles.map((role, index) => (
        
            <option key={index} value={role} className="form-option">{role}</option>
        
        ))}
            
            </select>

          </section>
          
                <Button type="submit" text={loading ? 'Chargement...' : 'Valider'} disabled={loading} color="#E0D5EC" />
        
        </form>

    );
}

export default UserEdit;
