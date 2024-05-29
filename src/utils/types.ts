import { LargeNumberLike } from "crypto";

export interface Todo {
    id:  number;
    text: string;
    dueDate?: string; 
    done: boolean;
    doneDate?: string; 
    priority: "High" | "Medium" | "Low";
    creationDate: string;
  }

export interface SearchAndFiltersControlsProps {
    handleSearch : (props: Filters) => void;

}

export interface editProps {
    id: number  | null;
    title: string;
    text: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate?: string;
}

export interface MetricsProps {
  avgTimeToFinishTasks: string;
  avgTimeToFinishTasksPriorityLow: string;
  avgTimeToFinishTasksPriorityMedium: string;
  avgTimeToFinishTasksPriorityHigh: string;

}

export interface ModalProps {
    id: number  | null;
    title: string;
    text: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate?: string | undefined;
    closeModal: () => void ;
    handleSaveBtn: (id: number | null, text: string, priority:  'High' | 'Medium' | 'Low', dueDate?: string) => void;
}
export interface TodoTableProps {
    todos: Todo[];
    currentPage: number;
    totalPages: number;
    prioritySort: string;
    dueDateSort: string;
    onPageChange: (page: number) => void;
    onCheckboxChange: (id: number, isChecked: boolean) => void;
    handleEdit: (editProps: editProps) => void;
    handleSort: (key: 'priority' | 'dueDate', direction: string) => void;
    handleQuitSort: (key: 'priority' | 'dueDate') => void;
    handleDelete: (todo: Todo) => void
  }
  
export interface PaginatedTodos {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: Todo[];
  avgTimeToFinishTasks: number;
  avgTimeToFinishTasksPriorityLow: number;
  avgTimeToFinishTaskspriorityMedium: number;
  avgTimeToFinishTaskspriorityHigh: number;
}
export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleFirstPage: () => void;
  handleLastPage: () => void;
}

const dummyTodos: Todo[] = [
    {
        id: 1,
        text: 'Buy groceries',
        dueDate: '2024-06-01',
        done: false,
        priority: 'High',
        creationDate: '2024-05-10',
      },
      {
        id: 2,
        text: 'Walk the dog',
        dueDate: '2024-06-05',
        done: true,
        doneDate: '2024-05-15',
        priority: 'Medium',
        creationDate: '2024-05-12',
      },
      {
        id: 3,
        text: 'Finish project proposal',
        dueDate: '2024-05-20',
        done: false,
        priority: 'High',
        creationDate: '2024-05-08',
      },
      {
        id: 4,
        text: 'Call mom',
        done: false,
        priority: 'Low',
        creationDate: '2024-05-11',
      },
      {
        id: 5,
        text: 'Go to the gym',
        dueDate: '2024-05-25',
        done: false,
        priority: 'Medium',
        creationDate: '2024-05-14',
      },
      {
        id: 6,
        text: 'Read a book',
        done: true,
        doneDate: '2024-05-13',
        priority: 'Low',
        creationDate: '2024-05-07',
      },
];


export interface Filters {
  page?: number;
  done: Boolean | null;
  priority: 'High' | 'Medium' | 'Low' | 'All' ;
  text: string;
  
}
export const dummyTodoTableProps: TodoTableProps = {
  todos: dummyTodos,
  currentPage: 1,
  totalPages: 3,
  onPageChange: (page) => {
    console.log(`Page changed to ${page}`);
  },
  onCheckboxChange: (id, isChecked) => {
    console.log(`Checkbox for todo with id ${id} changed to ${isChecked}`);
  },
  handleEdit: () => {
    console.log("editing...");
  },
  handleSort: (key: string, direction: string) => {
    console.log('sorting');
  },
  prioritySort: "",
  dueDateSort: "",
  handleQuitSort: function (key: "priority" | "dueDate"): void {
    throw new Error("Function not implemented.");
  },
  handleDelete: function (todo: Todo): void {
    throw new Error("Function not implemented.");
  }
};