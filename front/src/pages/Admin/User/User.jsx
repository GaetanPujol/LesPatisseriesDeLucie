import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { userService } from '../../../_services/user.service';
import Button from "../../../components/Button/Button";

const User = () => {

    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const flag = useRef(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    useEffect(() => {

        if (flag.current === false) {

            userService.getAllUsers()
                .then(res => {
                    setUsers(res.data.users);
                }).catch(err => console.log(err));

        }

        return () => flag.current = true;

    }, []);

    const delUser = (uid) => {
        
        setConfirmDelete(true);
        setUserIdToDelete(uid);
        
    };

    const handleDeleteConfirmed = () => {
        
        const adminToken = localStorage.getItem('token');

        if (!adminToken) {
        
            console.error("Admin token not found in local storage");
            return;
        
        }

        const config = {
        
            headers: {
        
                Authorization: adminToken
        
            }
        };

        userService.deleteUser(userIdToDelete, config)
            .then(res => {
        
                setUsers(users.filter(user => user.user_id !== userIdToDelete));
                setConfirmDelete(false);
                setUserIdToDelete(null);
        
            }).catch(err => console.log(err));
    };

    const handleCancelDelete = () => {
        
        setConfirmDelete(false);
        setUserIdToDelete(null);
    
    };

    return (
    
        <section className="container usersList">
    
            <h2>Liste des utilisateurs</h2>

            {users.map((user, index) => {
    
                return (
    
                    <article key={index} className="userCard">
    
                        <p className="pUser">Pseudo : {user.pseudo}</p>
                        <p className="pUser">Email : {user.email}</p>
                        <p className="pUser">rôle : {user.role}</p>
                        
                        <Button type={"button"} text={"Modifier"} onClick={() => navigate(`/admin/user/edit/${user.user_id}`)} color={"#E0D5EC"} />
                        <Button type={"button"} text={"Supprimer"} onClick={() => delUser(user.user_id)} color={"#E0D5EC"} />
                        
                        {confirmDelete && user.user_id === userIdToDelete && (
    
                            <section className="confirmDelete">
    
                                <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
    
                                <Button type={"button"} text={"Confirmer"} onClick={handleDeleteConfirmed} color={"#E0D5EC"} />
    
                                <Button type={"button"} text={"Annuler"}onClick={handleCancelDelete} color={"#E0D5EC"} />
                                
                            </section>
                        
                        )}
                
                    </article>
                )
            })}
        
        </section>

    )
}

export default User;
