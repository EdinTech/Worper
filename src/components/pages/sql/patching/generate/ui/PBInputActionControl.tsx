import React, { useState } from 'react';
import { AutoComplete, Form } from 'antd';
import { PBIOnChangeState } from '../../../../../util/interface/pages';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const PBInputActionControl: React.FC<{onChangeState: PBIOnChangeState}> = ({ onChangeState }) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <>
      <Form.Item label="Action">
        <AutoComplete
          options={options}
          style={{ width: "100%" }}
          onSelect={value => onChangeState({type: "action", value})}
          onSearch={(text) => setOptions(getPanelValue(text))}
          placeholder="input Action"
        />
      </Form.Item>
    </>
  );
}

export default PBInputActionControl;