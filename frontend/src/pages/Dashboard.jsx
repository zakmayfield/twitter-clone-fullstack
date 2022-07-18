import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGoals } from '../features/goals/goalSlice';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals } = useSelector((state) => state.goals);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getGoals());
  }, [user, navigate, dispatch]);

  return (
    <>
      <section>
        <h1>Welcome {user && user.username}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length !== 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem goal={goal} key={goal._id} />
            ))}
          </div>
        ) : (
          <h3>Please make some goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
