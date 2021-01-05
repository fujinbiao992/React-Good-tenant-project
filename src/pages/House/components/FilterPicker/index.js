import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'
/**
 * 1- 选中当前picker的值
 * 2- 在当前组件中,声明value值,通过组件传值的方式,进行值的传递
 *
*/
export default class FilterPicker extends Component {
  // 需要给当前的value提供一个默认值,该默认值,是选中后,点击确定按钮以后保存的选中的默认值
  state = {
    value: this.props.defaultSelectValues
  }
  handleValue = (value) => {
    this.setState(() => {
      return { value }
    })
  }
  render () {
    const { onCancel, data, cols, onSave, type } = this.props
    const { value } = this.state
    return (
      <>
        {/*
          选择器组件：
          1- 选择器组件,受控于表单的onChange事件
        */}
        <PickerView data={data} value={value} cols={cols} onChange={this.handleValue} />

        {/*
        底部按钮
        1- 使用子传父的方式,进行数据传递
        2- 把当前的value值,通过子组件传值的方式,传递给父组件,并且这个是一个方法,传递的是一个实参
        3- 形参位置,需要在父组件中,进行声明
        */}
        <FilterFooter onCancel={()=>{
            onCancel(type)
        }}
        onSave={() => {
          onSave(type, value)
        }} />
      </>
    )
  }
}
