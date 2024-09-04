import { Meta, StoryObj } from '@storybook/react'
import Task from './Task'

interface TaskProps {
  task: {
    id: string
    title: string
    state: string
    updatedAt: Date
  }
  onArchiveTask: (id: string) => void
  onPinTask: (id: string) => void
}

const meta: Meta<typeof Task> = {
  component: Task,
}
export default meta
type Story = StoryObj<typeof Task>

export const Primaty: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
      updatedAt: new Date(2021, 0, 1, 9, 0), // 필수 속성
    },
    onArchiveTask: () => {}, // 기본 동작을 위한 함수
    onPinTask: () => {}, // 기본 동작을 위한 함수
  },
}

export const Pinned: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_PINNED',
      updatedAt: new Date(2021, 0, 1, 9, 0), // 필수 속성
    },
    onArchiveTask: () => {}, // 기본 동작을 위한 함수
    onPinTask: () => {}, // 기본 동작을 위한 함수
  },
}

export const Archived: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_ARCHIVED',
      updatedAt: new Date(2021, 0, 1, 9, 0), // 필수 속성
    },
    onArchiveTask: () => {}, // 기본 동작을 위한 함수
    onPinTask: () => {}, // 기본 동작을 위한 함수
  },
}
