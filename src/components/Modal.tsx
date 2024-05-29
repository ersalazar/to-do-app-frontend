import { ModalProps } from '@/utils/types';
import React, { useState, useEffect } from 'react';


export default function Modal(props: ModalProps) {
  const { id, text, priority, dueDate, closeModal, handleSaveBtn } = props;

  const [todoText, setTodoText] = useState(text);
  const [todoPriority, setTodoPriority] = useState(priority);
  const [todoDueDate, setTodoDueDate] = useState(dueDate ? dueDate.split('T')[0] : '');
  const [todoDueTime, setTodoDueTime] = useState(dueDate ? dueDate.split('T')[1] : '');

  useEffect(() => {
    setTodoText(text);
    setTodoPriority(priority);
    setTodoDueDate(dueDate ? dueDate.split('T')[0] : '');
    setTodoDueTime(dueDate ? dueDate.split('T')[1].split('.')[0] : '');
  }, [id, text, priority, dueDate]);

  const handleSave = () => {
    // const combinedDateTime = todoDueDate && todoDueTime ? `${todoDueDate}T${todoDueTime}` : '';
    let combinedDateTime: string = ''
    if (todoDueDate) {
      combinedDateTime += todoDueDate
      if (todoDueTime) {
        combinedDateTime += `T${todoDueTime}`
      }
      else{
        combinedDateTime += `T00:00:00`
      }
    }
    handleSaveBtn(id, todoText, todoPriority, combinedDateTime);
  };

  return (
    <div className="w-full border border-blue-300">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full border border-green-500">
        <div className="relative w-8/12 my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {id === null ? 'New To Do' : `Edit To Do ${id}`}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <div className="w-10/12 h-fit flex flex-col justify-start items-start gap-2">
                <div className="w-3/4 flex flex-row items-center">
                  <label className="w-1/6" htmlFor="newTodoName">Name: </label>
                  <input
                    className="w-5/6 border border-black rounded-md"
                    type="text"
                    id="newTodoName"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                  />
                </div>

                <div className="w-3/4 flex flex-row items-center gap-2 h-fit">
                  <div className="w-1/2 flex flex-col">
                    <div className="w-full flex flex-row items-center mb-2">
                      <label className="w-1/3" htmlFor="newTodoPrioritySelect">Priority: </label>
                      <select
                        className="w-2/3 border border-black rounded-md"
                        id="newTodoPrioritySelect"
                        value={todoPriority}
                        onChange={(e) => setTodoPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div className="w-full flex flex-row items-center mb-2">
                      <label className="w-1/3" htmlFor="todoDate">Due date: </label>
                      <input
                        className="w-2/3 border border-black rounded-md"
                        type="date"
                        id="todoDate"
                        value={todoDueDate}
                        onChange={(e) => setTodoDueDate(e.target.value)}
                      />
                    </div>
                    <div className="w-full flex flex-row items-center">
                      <label className="w-1/3" htmlFor="todoTime">Due time: </label>
                      <input
                        className="w-2/3 border border-black rounded-md"
                        type="time"
                        id="todoTime"
                        value={todoDueTime}
                        onChange={(e) => setTodoDueTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}