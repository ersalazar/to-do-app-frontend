import { TodoTableProps } from "@/utils/types";
import React from "react";



export default function ToDoTable(props: TodoTableProps) {
    const {
        todos,
        onCheckboxChange,
        handleEdit,
        handleSort,
        handleQuitSort,
        dueDateSort,
        prioritySort,
        handleDelete
    } = props;

    const handleCheckboxChange = async (id: number, isChecked: boolean) => {
        const checkbox = document.getElementById(`checkbox-${id}`) as HTMLInputElement
        checkbox.disabled = true
        await onCheckboxChange(id, isChecked);
        checkbox.disabled = false
    };

    const calculateDateDifference = (dueDate: string): number => {
        const now = new Date();
        const due = new Date(dueDate);
        const differenceInTime = due.getTime() - now.getTime();
        return Math.ceil(differenceInTime / (1000 * 3600 * 24)); 
    };

    const getRowBackgroundColor = (dueDate: string | undefined): string => {
        if (dueDate === undefined || dueDate === null) {
            return ""
        }
        const difference = calculateDateDifference(dueDate);
        if (difference <= 7) {
            return "bg-red-100";
        } else if (difference <= 14) {
            return "bg-yellow-100";
        } else {
            return "bg-green-100";
        }
    };

    const getSortIcon = (direction: string): string => {
        if (direction === 'asc'){
            return '▲';
        }
        if (direction === 'desc'){
            return '▼';
        }
        return ''
    }

    return (
        <div className="flex flex-col items-center justify-center border-solid border-black">
            <table className="min-w-full divide-y divide-gray-200 border border-solid border-black">
                <thead className="bg-gray-500">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Done
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                            onClick={() => (handleSort('priority', prioritySort))}>
                            Priority {getSortIcon(prioritySort)}
                            {prioritySort ? <span className="text-right text-xs font-semibold text-white bg-red-500 rounded-sm px-2"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleQuitSort('priority')}}
                            >
                                x
                            </span> : ""}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                            onClick={() => (handleSort('dueDate', dueDateSort))}>
                            Due Date {getSortIcon(dueDateSort)}
                            {dueDateSort ? <span className="text-right text-xs font-semibold text-white bg-red-500 rounded-sm px-2"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleQuitSort('dueDate')}}
                            >
                                x
                            </span> : ""}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {todos.map(todo => (
                        <tr
                            key={todo.id}
                            className={`
                                ${todo.done ? "bg-gray-300" : getRowBackgroundColor(todo.dueDate)}
                             h-5` }
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    id={`checkbox-${todo.id}`}
                                    onChange={e =>
                                        handleCheckboxChange(todo.id, e.target.checked)
                                    }
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {todo.done ? <del>{todo.text}</del> : <p>{todo.text}</p>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{todo.priority}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{todo.dueDate?.split("T")[0]}</td>
                            <td className="px-6 py-4 whitespace-nowrap flex-col justify-between gap-2">
                                <button className="text-white m-1 w-1/3 h-full rounded-md bg-blue-500" onClick={() => handleEdit({
                                    id: todo.id,
                                    title: `Edit To do: ${todo.id}`,
                                    text: todo.text,
                                    priority: todo.priority,
                                    dueDate: todo.dueDate !== undefined ? todo.dueDate : undefined
                                })}>
                                    Edit
                                </button>
                                <button className="text-white m-1 w-1/3 h-full rounded-md bg-red-500"
                                        onClick={() => {handleDelete(todo)}}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
