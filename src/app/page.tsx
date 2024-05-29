'use client'
import Modal from "../components/Modal";
import PaginationControl from "../components/PaginationControl";
import SearchAndFilterControls from "../components/searchAndFilterControls";
import ToDoTable from "../components/toDoTable";
import { PaginatedTodos, Todo, dummyTodoTableProps, Filters, ModalProps, editProps } from "../utils/types";
import { useEffect, useState } from "react";
import axios, { AxiosError } from 'axios';
import { baseurl } from "../utils/constants";
import Metrics from "../components/Metrics";
import React from "react";

const { 
  currentPage,
  totalPages,
  onPageChange,
} = dummyTodoTableProps

const initialFilters: Filters = {
  done: null,
  priority: "All",
  text: "",
  
  
}

export default function Home() {

  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {setShowModal(false)}


  const [todos, setTodos] = useState(dummyTodoTableProps.todos)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalTodos, setTotalTodos] = useState(0)
  // const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState('');
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [prioritySort, setPrioritySort] = useState('')
  const [dueDateSort, setDueDateSort] = useState('')
  const [avgTimeToFinishTasks, setAvgTimeToFinishTasks] = useState(0)
  const [avgTimeToFinishLowTasks, setAvgTimeToFinishLowTasks] = useState(0)
  const [avgTimeToFinishMediumTasks, setAvgTimeToFinishMediumTasks] = useState(0)
  const [avgTimeToFinishHighTasks, setAvgTimeToFinishHighTasks] = useState(0)
  
  const handleSaveTodo = async (id: number | null, text: string, priority:  "High" | "Medium" | "Low", dueDate?: string | undefined) => {
    //setLoading(true)
    
    if (id !== null) {
      try {
        const response = await axios.put(`${baseurl}/${id}`, {
          text,
          priority,
          ...(dueDate !== undefined && {dueDate})
        })
        if (response.status === 200) {
          await fetchData(sorting, filters)
          //setLoading(false)
        } else {
          throw new Error("Error while updating data")
        }
      } catch (err) {
        
        alert(err)
        //setLoading(false)
      } 
      setShowModal(false)
      return
    }
    try {
      const response = await axios.post(baseurl, {
        text,
        priority,
        ...(dueDate !== undefined && {dueDate})
      })
      
      if (response.status == 201) {
        await fetchData(sorting, filters)
        alert("To do created succesfully")
        //setLoading(false)
      } else {
        throw new Error("Error while creating todo")
      }
    } catch (err) {
      
      alert(err)
      //setLoading(false)
    } 
    setShowModal(false)
    return
  }
  const [currentTodo, setCurrentTodo] = useState<ModalProps>({
    id: null,
    text: '',
    title: 'New To Do',
    priority: 'Medium',
    dueDate: '',
    closeModal: closeModal,
    handleSaveBtn: handleSaveTodo,
  }); 
  const onCheckboxChange = async (id: number, isChecked: boolean) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        return {...todo, done: isChecked}
      }
      return todo
    })
    if (isChecked) {
      try{
        const response = await axios.post(`${baseurl}/${id}/done`)
        // console.log(response.statusText.toString())
        // console.log(response.data)
        fetchData(sorting, filters)
      } catch (err) {
        alert(err)
      }
    } else {
      try{
        const response = await axios.put(`${baseurl}/${id}/undone`)
        // console.log(response.status.toString())
        // console.log(response.data)
        fetchData(sorting, filters)
      } catch (err) {
        alert(err)
      }
    }
    setTodos(updatedTodos)
  }
  const handleSearchBtn = async (filters: Filters) => {
    
    await fetchData('', filters)
    setSorting('')
    setFilters(filters)
    
  }
  const fetchData = async (sortBy: string, filters: Filters) => {
    //setLoading(true);
    
    try {
      const {done, text, priority, page} = filters
      console.log("fetchData called with params:", { text, priority, done, page, sortBy });
      const response = await axios.get(baseurl, {
        params: {
          text, 
          ...(priority !== 'All' && {priority}),
          ...(done !== null && {done}),
          ...(page !== undefined && {page}),
          sortBy
        }
      });
      if (response.status != 200) {
        throw new Error()
      }
      
      const data: PaginatedTodos= response.data
      const {items, totalPages, totalItems, currentPage, 
        avgTimeToFinishTasks, avgTimeToFinishTasksPriorityLow,
        avgTimeToFinishTaskspriorityHigh, avgTimeToFinishTaskspriorityMedium
       } = data
      
      setTodos(items)
      setCurrentPage(currentPage)
      setTotalPages(totalPages)
      setTotalTodos(totalItems)
      setAvgTimeToFinishHighTasks(avgTimeToFinishTaskspriorityHigh)
      setAvgTimeToFinishMediumTasks(avgTimeToFinishTaskspriorityMedium)
      setAvgTimeToFinishLowTasks(avgTimeToFinishTasksPriorityLow)
      setAvgTimeToFinishTasks(avgTimeToFinishTasks)
      
      //setLoading(false)
      
    } catch (er) {
      alert(er)
    }
    
  }
  const handleEditClick = (editProps: editProps) => {
    const {id, text, priority, dueDate} = editProps
    
    setCurrentTodo({
      ...currentTodo,
      id: id,
      text: text, 
      priority: priority,
      dueDate: dueDate === undefined ? '' : dueDate
    })
    setShowModal(true)
    
  }
  const handleNewTodo = () => {
    
    setCurrentTodo({
      ...currentTodo,
      id: null,
      text: '',
      priority: 'Medium',
      dueDate: ''
    })
    setShowModal(true)
  }
  const navToFirst = async () => {
    // setLoading(true)
    
    setFilters({
      ...filters,
      page: 0
    })
    
    // setLoading(false)
  }
  const navToPrev = async () => {
    if (currentPage >= 1) {
      // setLoading(true)
      setFilters({
        ...filters,
        page: currentPage - 1
      })
      
      // setLoading(false)
    }
    return
    
  }
  const navToNext = async () => {
    if (currentPage < totalPages - 1) {
      // setLoading(true)
      setFilters({
        ...filters,
        page: currentPage + 1
      })
      // setLoading(false)
    }
    
  }
  const navToLast = async () => {
    // setLoading(true)
    setFilters({
      ...filters,
      page: totalPages - 1
    })
    
  }
  
  const handleSortClick = async (key: 'priority' | 'dueDate', direction: string) =>  {
    if (key === 'priority') {
      if (!direction || direction === 'asc') {
        setPrioritySort('desc')
      }
      else {
        setPrioritySort('asc')
      }
    }
    if (key === 'dueDate') {
      // console.log('dueDate', direction)
      if (!direction || direction === 'desc') {
        setDueDateSort('asc')
      }
      else {
        setDueDateSort('desc')
      }
    }
    return
  }
  const handleQuitSort = (key: 'priority' | 'dueDate') => {
    if (key === 'dueDate') {
      setDueDateSort('')
    } else {
      setPrioritySort('')
    }
    
  }

  const handleDelete = async (todo: Todo) => {
    // setLoading(true)
  
    const {id, text} = todo
    const confirmed = window.confirm(`Do you want to delete this task? \n ${todo.text}`)

    if (!confirmed) {
      // setLoading(false)
      return;
    }
    try {
      const response = await axios.delete(`${baseurl}/${id}`)
      if (response.status === 200) {
        fetchData(sorting, filters);
      } else {
        throw new Error("error while deleting task")
      }
    } catch (err) {
       alert(err)
    }
  }
  
  useEffect(() => {

      let sortingBy: String[] = []

      if(prioritySort) {
          sortingBy.push(`priority${prioritySort === 'desc' ? ':desc' : ''}`)
      }
      if(dueDateSort) {
          sortingBy.push(`dueDate${dueDateSort === 'desc' ? ':desc' : ''}`)
      }
      // console.log(sortString)
      setSorting(sortingBy.join(','))
      // console.log(sortString)

      // console.log(sorting)
  }, [prioritySort, dueDateSort])
  
  useEffect(() => {
    navToFirst()
    // console.log(sorting)
  },[sorting])
  
  useEffect(() => {
    fetchData(sorting, filters)
  }, [])
  
  useEffect(() => {
    fetchData(sorting, filters)
  }, [filters])
  

  return (
    showModal ? (
      <div className="w-full h-full">
        <Modal {...currentTodo}/>
      </div>
    ) :
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 overflow-y-auto py-5" >
        <div className=" w-10/12  bg-white border border-black p-2 justify-center items-center ">
          <SearchAndFilterControls handleSearch={handleSearchBtn} />
        </div>
        <div className=" self-start w-10/12 mx-auto my-3">
          <button className="w-1/6 h-10 rounded-md bg-gray-300" onClick={handleNewTodo}> New To do </button>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-10/12 my-3">
              <ToDoTable 
                todos={todos}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                onCheckboxChange={onCheckboxChange}
                handleEdit={handleEditClick}
                handleSort={handleSortClick}
                prioritySort={prioritySort}
                dueDateSort={dueDateSort} 
                handleQuitSort={handleQuitSort}  
                handleDelete={handleDelete}  />
            </div>
            <div className="w-10/12 flex items-start justify-center">
              <PaginationControl 
              totalPages={totalPages} 
              currentPage={currentPage + 1} 
              handlePrevPage={navToPrev}
              handleFirstPage={navToFirst}
              handleLastPage={navToLast}
              handleNextPage={navToNext} />
            </div>
            <div className="w-10/12 flex items-start justify-center mt-8">
              <Metrics 
                avgTimeToFinishTasks={avgTimeToFinishTasks.toString()} 
                avgTimeToFinishTasksPriorityLow={avgTimeToFinishLowTasks.toString()} 
                avgTimeToFinishTasksPriorityMedium={avgTimeToFinishMediumTasks.toString()} 
                avgTimeToFinishTasksPriorityHigh={avgTimeToFinishHighTasks.toString()} />
      
            </div>

        </div>
  
      </div>
  );
}
