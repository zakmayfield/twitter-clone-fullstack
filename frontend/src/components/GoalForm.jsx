import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';

const GoalForm = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.goals);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      dispatch(createGoal({ text }));
    }
    setText('');
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            placeholder='Become a fullstack dev'
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button
            className={`btn btn-block ${isLoading ? 'btn-loading' : ''}`}
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
