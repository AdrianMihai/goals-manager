import { Tabs } from '@ark-ui/react';
import React from 'react';
import Mail from "@fluentui/svg-icons/icons/mail_16_regular.svg";
import './types.d.ts';

export const App = () => {
  return (
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="react">React</Tabs.Trigger>
        <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
        <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="react"><Mail /> React Content</Tabs.Content>
      <Tabs.Content value="vue">Vue Content</Tabs.Content>
      <Tabs.Content value="solid">Solid Content</Tabs.Content>
    </Tabs.Root>
  )
}