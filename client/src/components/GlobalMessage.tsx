import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import { RootState } from '../app/store';
import { clearMessage } from '../features/message/messageSlice';

const GlobalMessage: React.FC = () => {
  const dispatch = useDispatch();
  const { content, type } = useSelector((state: RootState) => state.message);

  useEffect(() => {
    if (content && type) {
      message[type](content);
      dispatch(clearMessage());
    }
  }, [content, type, dispatch]);

  return null; // This component doesn't render anything visible
};

export default GlobalMessage;
