import React from "react";
import { DatePicker, Form, Input, TimePicker, Select, InputNumber } from "antd";

const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField =
  (AntComponent) =>
  ({
    field,
    form,
    hasFeedback,
    label,
    selectOptions,
    submitCount,
    type,
    ...props
  }) => {
    const touched = form.touched[field.name];
    const submitted = submitCount > 0;
    const hasError = form.errors[field.name];
    const submittedError = hasError && submitted;
    const touchedError = hasError && touched;

    const onInputChange = ({ target: { value } }) =>
      form.setFieldValue(field.name, value);

    const onChange = (value) => form.setFieldValue(field.name, value);
    
    const onBlur = () => form.setFieldTouched(field.name, true);
    return (
      <div className="field-container">
        <FormItem
          label={label}
          hasFeedback={
            (hasFeedback && submitted) || (hasFeedback && touched)
              ? true
              : false
          }
          help={submittedError || touchedError ? hasError : false}
          validateStatus={submittedError || touchedError ? "error" : "success"}
        >
          <AntComponent
            size="large"
            {...field}
            {...props}
            onBlur={onBlur}
            onChange={
              props.onChange ? props.onChange : type ? onInputChange : onChange
            }
          >
            {selectOptions &&
              selectOptions.map((v, i) => (
                <Option key={i} value={v.value}>
                  {v.name}
                </Option>
              ))}
          </AntComponent>
        </FormItem>
      </div>
    );
  };

CreateAntField.defaultProps = {
  onBlur: null,
  onChange: null,
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntTextArea = CreateAntField(Input.TextArea);
export const AntTimePicker = CreateAntField(TimePicker);
export const AntPassword = CreateAntField(Input.Password);
export const AntInputNumber = CreateAntField(InputNumber);
