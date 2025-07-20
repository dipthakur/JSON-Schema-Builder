import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button, Typography, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import JsonPreview from './JsonPreview';
import FieldRow from './FieldRow';

const { Title } = Typography;

export const SchemaBuilder = () => {
  const { control } = useForm({
    defaultValues: {
      fields: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  });

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <Title level={4}>Schema Builder</Title>
        {fields.map((field, index) => (
          <FieldRow key={field.id} control={control} index={index} remove={remove} nestName={`fields.${index}`} />
        ))}
        <Button type="primary" onClick={() => append({ key: '', type: 'String', children: [] })} icon={<PlusOutlined />} block>
          Add Field
        </Button>
        <Divider />
      </div>
      <div style={{ flex: 1 }}>
        <Title level={4}>JSON Preview</Title>
        <JsonPreview control={control} />
      </div>
    </div>
  );
};