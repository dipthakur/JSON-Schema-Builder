import React from 'react';
import { useFieldArray, Controller, useWatch } from 'react-hook-form';
import { Input, Select, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const FieldRow = ({ control, index, remove, nestName }) => {
  const type = useWatch({
    control,
    name: `${nestName}.type`
  });

  const { fields, append, remove: removeNested } = useFieldArray({
    control,
    name: `${nestName}.children`
  });

  return (
    <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
      <Controller
        name={`${nestName}.key`}
        control={control}
        render={({ field }) => <Input {...field} placeholder="Field Name" />}
      />
      <Controller
        name={`${nestName}.type`}
        control={control}
        render={({ field }) => (
          <Select {...field} style={{ width: 120 }}>
            <Select.Option value="String">String</Select.Option>
            <Select.Option value="Number">Number</Select.Option>
            <Select.Option value="Nested">Nested</Select.Option>
          </Select>
        )}
      />
      <Button type="text" icon={<MinusCircleOutlined />} danger onClick={() => remove(index)} />

      {type === 'Nested' && (
        <div style={{ marginLeft: '30px' }}>
          {fields.map((subField, subIndex) => (
            <FieldRow
              key={subField.id}
              control={control}
              index={subIndex}
              remove={removeNested}
              nestName={`${nestName}.children.${subIndex}`}
            />
          ))}
          <Button type="primary" onClick={() => append({ key: '', type: 'String', children: [] })} icon={<PlusOutlined />} block>
            Add Nested Field
          </Button>
        </div>
      )}
    </Space>
  );
};

export default FieldRow;