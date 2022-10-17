import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div className='header-container'>
      <header className='header'>
        <div className='logo'>
          <Link to='/'>
            This is a WIP (Work In Progress). Login / Register are not styled
          </Link>
        </div>
        <ul>
          {user ? (
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
