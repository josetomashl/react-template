import { Tab, Tabs } from '@/components/Tabs';
import { Button } from '@/ui/Button';
import { Flex } from '@/ui/Flex';
import { Input } from '@/ui/Input';
import { useState } from 'react';

export function TryOutPage() {
  const [tab, setTab] = useState(0);

  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('18');
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [range, setRange] = useState('50');
  const [required, setRequired] = useState('');
  const [disabled, setDisabled] = useState('Disabled value');
  const [clearable, setClearable] = useState('Clear me');
  const [regex, setRegex] = useState('');

  return (
    <Tabs onChange={setTab} tabs={[{ label: 'Button' }, { label: 'Input' }]}>
      <Tab>
        <Flex flexDirection='column' gap={12}>
          <Button title='Button 1' disabled />
          <Button title='Button 2' icon='chevronDown' />
          <Button icon='chevronUp' />
          <Button title='Button 3' rounded />
          <Button title='Button 4' icon='chevronDown' rounded />
          <Button icon='chevronUp' rounded />
          <Button title='Button 6' icon='chevronDown' iconPosition='right' />
          <Button title='Button 7' />
        </Flex>
      </Tab>
      <Tab>
        <Flex flexDirection='column' gap={12}>
          <Input
            label='Text'
            value={text}
            onChange={(value, valid) => {
              console.log('Text', value, valid);
              setText(value);
            }}
          />

          <Input
            type='email'
            label='Email'
            value={email}
            onChange={(value, valid) => {
              console.log('Email', value, valid);
              setEmail(value);
            }}
            regExp={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
            errorMessage='Invalid email'
          />

          <Input
            type='password'
            label='Password'
            value={password}
            onChange={(value, valid) => {
              console.log('Password', value, valid);
              setPassword(value);
            }}
          />

          <Input
            type='number'
            label='Number'
            value={number}
            onChange={(value, valid) => {
              console.log('Number', value, valid);
              setNumber(value);
            }}
          />

          <Input
            type='tel'
            label='Phone'
            value={phone}
            onChange={(value, valid) => {
              console.log('Phone', value, valid);
              setPhone(value);
            }}
            backgroundColor='#fff'
          />

          <Input
            type='url'
            label='Website'
            value={url}
            onChange={(value, valid) => {
              console.log('URL', value, valid);
              setUrl(value);
            }}
            clearable
            required
            disabled
            backgroundColor='#fff'
          />

          <Input
            type='date'
            label='Date'
            value={date}
            onChange={(value, valid) => {
              console.log('Date', value, valid);
              setDate(value);
            }}
          />

          <Input
            label='Required'
            value={required}
            required
            onChange={(value, valid) => {
              console.log('Required', value, valid);
              setRequired(value);
            }}
          />

          <Input
            label='Disabled'
            value={disabled}
            disabled
            onChange={(value, valid) => {
              console.log('Disabled', value, valid);
              setDisabled(value);
            }}
          />

          <Input
            label='Clearable'
            value={clearable}
            clearable
            onChange={(value, valid) => {
              console.log('Clearable', value, valid);
              setClearable(value);
            }}
          />

          <Input
            label='Only uppercase letters'
            value={regex}
            regExp={/^[A-Z]+$/}
            errorMessage='Only uppercase letters are allowed'
            onChange={(value, valid) => {
              console.log('Regex', value, valid);
              setRegex(value);
            }}
          />
        </Flex>
      </Tab>
    </Tabs>
  );
}
