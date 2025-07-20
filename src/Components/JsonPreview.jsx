import React from 'react';
import { useWatch } from 'react-hook-form';
import { Card } from 'antd';

const JsonPreview = ({ control }) => {
  const fields = useWatch({ control, name: 'fields' });

  const convertToJson = (fieldsArray) => {
    const result = {};
    fieldsArray?.forEach(({ key, type, children }) => {
      if (!key) return;
      if (type === 'String') result[key] = "String";
      else if (type === 'Number') result[key] = 0;
      else if (type === 'Nested') result[key] = convertToJson(children);
    });
    return result;
  };

  return (
    <Card>
      <pre>{JSON.stringify(convertToJson(fields), null, 2)}</pre>
    </Card>
  );
};

export default JsonPreview;
