import React, { useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Tag } from 'antd';
import useTemplate from '../../util/hooks/useTemplate';

const TestPage: React.FC = () => {
  const {templateManager, templateListManager, templateIndexManager} = useTemplate();
  useEffect(()=> {
    (async () => {
      const templateList = await templateListManager.get();
      console.log(templateList);
      const templateIndex = await templateIndexManager.get();
      console.log(templateIndex);
    })();
  }, []);

  return (
    <>

    </>
  );
};

export default TestPage;