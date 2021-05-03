/** @jsx h */
/* eslint-disable no-console */
import { h, JSX } from 'preact'
import { useState } from 'preact/hooks'

import { useInitialFocus } from '../../../hooks/use-initial-focus'
import { MIXED_STRING } from '../../../utilities/mixed-values'
import { IconSpaceHorizontal } from '../../icon/icon-space-horizontal/icon-space-horizontal'
import { TextboxNumeric } from './textbox-numeric'

export default { title: 'Components/Textbox Numeric' }

export const Empty = function () {
  const [value, setValue] = useState('')
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return <TextboxNumeric onInput={handleInput} value={value} />
}

export const Focused = function () {
  const [value, setValue] = useState('')
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxNumeric
      {...useInitialFocus()}
      onInput={handleInput}
      value={value}
    />
  )
}

export const Placeholder = function () {
  const [value, setValue] = useState('')
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxNumeric
      onInput={handleInput}
      placeholder="Placeholder"
      value={value}
    />
  )
}

export const Filled = function () {
  const [value, setValue] = useState('42')
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return <TextboxNumeric onInput={handleInput} value={value} />
}

export const Disabled = function () {
  function handleInput() {
    throw new Error('This function should not be called')
  }
  return <TextboxNumeric disabled onInput={handleInput} value="42" />
}

export const NoBorder = function () {
  const [value, setValue] = useState('42')
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return <TextboxNumeric noBorder onInput={handleInput} value={value} />
}

export const Icon = function () {
  const [value, setValue] = useState('42')
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxNumeric
      icon={<IconSpaceHorizontal />}
      onInput={handleInput}
      value={value}
    />
  )
}

export const TextIcon = function () {
  const [value, setValue] = useState('42')
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return <TextboxNumeric icon="X" onInput={handleInput} value={value} />
}

export const Mixed = function () {
  const [value, setValue] = useState(MIXED_STRING)
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return <TextboxNumeric onInput={handleInput} value={value} />
}

export const IntegersOnly = function () {
  const [value, setValue] = useState('42')
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return <TextboxNumeric integer onInput={handleInput} value={value} />
}

export const CustomIncrements = function () {
  const [value, setValue] = useState('42')
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxNumeric
      incrementBig={8}
      incrementSmall={4}
      onInput={handleInput}
      value={value}
    />
  )
}

export const MinimumMaximum = function () {
  const [value, setValue] = useState('0')
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxNumeric
      maximum={10}
      minimum={0}
      onInput={handleInput}
      value={value}
    />
  )
}

export const OnValueChange = function () {
  const [value, setValue] = useState('42')
  function handleNumericValueChange(newNumericValue: null | number) {
    console.log(newNumericValue)
  }
  return (
    <TextboxNumeric
      onNumericValueChange={handleNumericValueChange}
      onValueChange={setValue}
      value={value}
    />
  )
}