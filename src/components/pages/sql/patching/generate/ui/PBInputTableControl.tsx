import React, { useState } from 'react';
import { Form, AutoComplete } from 'antd';
import { PBIOnChangeState } from '../../../../../util/interface/pages';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const PBInputTableControl: React.FC<{onChangeState: PBIOnChangeState}> = ({ onChangeState }) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <>
      <Form.Item label="Table Name">
        <AutoComplete
          options={options}
          style={{ width: "100%" }}
          onSelect={value => onChangeState({type: "tableName", value})}
          onSearch={(text) => setOptions(getPanelValue(text))}
          placeholder="input Table Name"
        />
      </Form.Item>
    </>
  );
}

export default PBInputTableControl;